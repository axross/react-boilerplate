import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";
import TaskId from "../entities/TaskId";

interface TaskUpdatable {
  setIsTaskDone(args: {
    taskId: TaskId;
    isDone: boolean;
    session: AuthenticationSession;
  }): Promise<Task>;
}

export class TaskUpdateFailure extends Error {
  constructor({
    taskId,
    isDone,
    session
  }: {
    taskId: TaskId;
    isDone: boolean;
    session: AuthenticationSession;
  }) {
    super(
      `TaskUpdateFailure: updating task was failed. (taskId: ${taskId}, isDone: ${isDone}, session: ${session})`
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default TaskUpdatable;
