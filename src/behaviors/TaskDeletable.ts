import AuthenticationSession from "../entities/AuthenticationSession";
import TaskId from "../entities/TaskId";

interface TaskDeletable {
  deleteTask(args: {
    taskId: TaskId;
    session: AuthenticationSession;
  }): Promise<void>;
}

export class TaskDeleteFailure extends Error {
  constructor({
    taskId,
    session
  }: {
    taskId: TaskId;
    session: AuthenticationSession;
  }) {
    super(
      `TaskDeleteFailure: deleting a task was failed. (taskId: ${taskId}, session: ${session})`
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default TaskDeletable;
