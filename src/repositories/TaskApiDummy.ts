import TaskCreatable from "../behaviors/TaskCreatable";
import TaskDeletable, { TaskDeleteFailure } from "../behaviors/TaskDeletable";
import TaskListable from "../behaviors/TaskListable";
import TaskUpdatable, { TaskUpdateFailure } from "../behaviors/TaskUpdtable";
import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";
import TaskId from "../entities/TaskId";

class TaskApiDummy
  implements TaskCreatable, TaskDeletable, TaskListable, TaskUpdatable {
  constructor() {
    this.tasks = [
      ApiDummyTask.create({
        text: "ABC",
        isDone: false
      }),
      ApiDummyTask.create({
        text: "DEF",
        isDone: true
      }),
      ApiDummyTask.create({
        text: "GHI",
        isDone: false
      })
    ];
  }

  private tasks: Task[];

  createTask({
    text,
    isDone
  }: {
    text: string;
    isDone: boolean;
    session: AuthenticationSession;
  }): Promise<Task> {
    return new Promise<Task>(resolve =>
      setTimeout(() => {
        const task = ApiDummyTask.create({ text, isDone });

        this.tasks.push(task);

        resolve(task);
      }, 750)
    );
  }

  async deleteTask({
    taskId,
    session
  }: {
    taskId: TaskId;
    session: AuthenticationSession;
  }): Promise<void> {
    return new Promise(resolve =>
      setTimeout(() => {
        const targetTask = this.tasks.find(t => t.id === taskId);

        if (targetTask === undefined) {
          throw new TaskDeleteFailure({ taskId, session });
        }

        this.tasks = this.tasks.filter(task => task.id !== taskId);

        resolve();
      }, 750)
    );
  }

  async setIsTaskDone({
    taskId,
    isDone,
    session
  }: {
    taskId: TaskId;
    isDone: boolean;
    session: AuthenticationSession;
  }): Promise<Task> {
    return new Promise(resolve =>
      setTimeout(() => {
        const targetTask = this.tasks.find(t => t.id === taskId);

        if (targetTask === undefined) {
          throw new TaskUpdateFailure({ taskId, isDone, session });
        }

        const updatedTask = new ApiDummyTask({ ...targetTask, isDone: isDone });

        this.tasks = this.tasks.map(task =>
          task.id === taskId ? updatedTask : task
        );

        resolve(targetTask);
      }, 750)
    );
  }

  async getAllTasks({  }: { session: AuthenticationSession }): Promise<Task[]> {
    return new Promise(resolve => setTimeout(() => resolve(this.tasks), 750));
  }
}

class ApiDummyTask extends Task {
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

  static create({ text, isDone }: { text: string; isDone: boolean }) {
    return new ApiDummyTask({ id: new ApiDummyTaskId(), text, isDone });
  }
}

class ApiDummyTaskId extends TaskId {
  constructor() {
    super();

    this.value = Math.random();
  }

  private readonly value: number;

  equal(taskId: TaskId): boolean {
    return taskId instanceof ApiDummyTaskId && taskId.value === this.value;
  }

  toString() {
    return this.value.toString();
  }
}

export default TaskApiDummy;
