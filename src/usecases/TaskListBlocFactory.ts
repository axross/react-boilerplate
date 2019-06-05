import TaskCreatable from "../behaviors/TaskCreatable";
import TaskDeletable from "../behaviors/TaskDeletable";
import TaskListable from "../behaviors/TaskListable";
import TaskUpdatable from "../behaviors/TaskUpdtable";
import AuthenticationSession from "../entities/AuthenticationSession";
import TaskListBloc from "./TaskListBloc";

class TaskListBlocFactory {
  constructor({
    taskCreatable,
    taskDeletable,
    taskListable,
    taskUpdatable
  }: {
    taskCreatable: TaskCreatable;
    taskDeletable: TaskDeletable;
    taskListable: TaskListable;
    taskUpdatable: TaskUpdatable;
  }) {
    this.taskCreatable = taskCreatable;
    this.taskDeletable = taskDeletable;
    this.taskListable = taskListable;
    this.taskUpdatable = taskUpdatable;
  }

  private readonly taskCreatable: TaskCreatable;

  private readonly taskDeletable: TaskDeletable;

  private readonly taskListable: TaskListable;

  private readonly taskUpdatable: TaskUpdatable;

  create({ session }: { session: AuthenticationSession }): TaskListBloc {
    return new TaskListBloc({
      session,
      taskCreatable: this.taskCreatable,
      taskDeletable: this.taskDeletable,
      taskListable: this.taskListable,
      taskUpdatable: this.taskUpdatable
    });
  }
}

export default TaskListBlocFactory;
