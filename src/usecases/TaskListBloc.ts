import { Set } from "immutable";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import TaskCreatable, { TaskCreateFailure } from "../behaviors/TaskCreatable";
import TaskDeletable, { TaskDeleteFailure } from "../behaviors/TaskDeletable";
import TaskListable from "../behaviors/TaskListable";
import TaskUpdatable, { TaskUpdateFailure } from "../behaviors/TaskUpdtable";
import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";
import TaskId from "../entities/TaskId";

class TaskListBloc {
  constructor({
    session,
    taskCreatable,
    taskDeletable,
    taskListable,
    taskUpdatable
  }: {
    session: AuthenticationSession;
    taskCreatable: TaskCreatable;
    taskDeletable: TaskDeletable;
    taskListable: TaskListable;
    taskUpdatable: TaskUpdatable;
  }) {
    this.session = session;
    this.taskCreatable = taskCreatable;
    this.taskDeletable = taskDeletable;
    this.taskListable = taskListable;
    this.taskUpdatable = taskUpdatable;
  }

  private readonly session: AuthenticationSession;

  private readonly taskCreatable: TaskCreatable;

  private readonly taskDeletable: TaskDeletable;

  private readonly taskListable: TaskListable;

  private readonly taskUpdatable: TaskUpdatable;

  private readonly $tasks = new BehaviorSubject<Task[]>([]);

  private readonly $updatingTaskIds = new BehaviorSubject<Set<TaskId>>(Set());

  get tasks(): Observable<Task[]> {
    return this.$tasks;
  }

  get currentTasks(): Task[] {
    return this.$tasks.value;
  }

  get updatingTasks(): Observable<Task[]> {
    return combineLatest(this.$tasks, this.$updatingTaskIds).pipe(
      map(([tasks, updatingTaskIds]) =>
        tasks.filter(task => updatingTaskIds.has(task.id))
      )
    );
  }

  get currentUpdatingTasks(): Task[] {
    return this.$tasks.value.filter(task =>
      this.$updatingTaskIds.value.has(task.id)
    );
  }

  async addByText(text: string): Promise<void> {
    const temporaryTask = UncreatedTask.create({ text, isDone: false });

    this.$updatingTaskIds.next(
      this.$updatingTaskIds.value.add(temporaryTask.id)
    );
    this.$tasks.next([...this.$tasks.value, temporaryTask]);

    let createdTask: Task;

    try {
      createdTask = await this.taskCreatable.createTask({
        text: temporaryTask.text,
        isDone: temporaryTask.isDone,
        session: this.session
      });
    } catch (err) {
      if (err instanceof TaskCreateFailure) {
        // delete the temporarily created task to rollback
        this.$tasks.next(
          this.$tasks.value.filter(t => t.id !== temporaryTask.id)
        );
        this.$updatingTaskIds.next(
          this.$updatingTaskIds.value.remove(temporaryTask.id)
        );
      }

      return;
    }

    this.$tasks.next(
      this.$tasks.value.map(t => (t.id === temporaryTask.id ? createdTask : t))
    );
    this.$updatingTaskIds.next(
      this.$updatingTaskIds.value.remove(temporaryTask.id)
    );
  }

  async delete(task: Task): Promise<void> {
    this.$updatingTaskIds.next(this.$updatingTaskIds.value.add(task.id));

    try {
      await this.taskDeletable.deleteTask({
        taskId: task.id,
        session: this.session
      });
    } catch (err) {
      // TODO: need implementation rolling back
      if (err instanceof TaskDeleteFailure) {
      }

      return;
    }

    this.$tasks.next(this.$tasks.value.filter(t => t.id !== task.id));
    this.$updatingTaskIds.next(this.$updatingTaskIds.value.remove(task.id));
  }

  async setChecked({
    task,
    isDone
  }: {
    task: Task;
    isDone: boolean;
  }): Promise<any> {
    const updated = new UncreatedTask({ ...task, isDone });

    this.$updatingTaskIds.next(this.$updatingTaskIds.value.add(updated.id));
    this.$tasks.next(
      this.$tasks.value.map(t => (t.id === updated.id ? updated : t))
    );

    try {
      await this.taskUpdatable.setIsTaskDone({
        taskId: task.id,
        isDone,
        session: this.session
      });
    } catch (err) {
      if (err instanceof TaskUpdateFailure) {
        // rollback the tasks when an error cause
        this.$tasks.next(
          this.$tasks.value.map(t => (t.id === updated.id ? task : t))
        );
        this.$updatingTaskIds.next(
          this.$updatingTaskIds.value.remove(updated.id)
        );
      }

      return;
    }

    this.$updatingTaskIds.next(this.$updatingTaskIds.value.remove(updated.id));
  }

  async initialize() {
    const tasks = await this.taskListable.getAllTasks({
      session: this.session
    });

    this.$tasks.next(tasks);
  }

  dispose() {}
}

class UncreatedTask extends Task {
  constructor({
    id,
    text,
    isDone
  }: {
    id: TaskId;
    text: string;
    isDone: boolean;
  }) {
    super({ id });

    this.text = text;
    this.isDone = isDone;
  }

  readonly text: string;

  readonly isDone: boolean;

  static create({
    text,
    isDone
  }: {
    text: string;
    isDone: boolean;
  }): UncreatedTask {
    return new UncreatedTask({ id: new UncreatedTaskId(), text, isDone });
  }
}

class UncreatedTaskId extends TaskId {
  constructor() {
    super();

    this.value = Math.random();
  }

  readonly value: number;

  equal(taskId: TaskId): boolean {
    return taskId instanceof UncreatedTaskId && taskId.value === this.value;
  }

  toString() {
    return this.value.toString();
  }
}

export default TaskListBloc;
