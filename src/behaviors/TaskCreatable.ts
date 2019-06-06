import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";

interface TaskCreatable {
  createTask(args: {
    text: string;
    isDone: boolean;
    session: AuthenticationSession;
  }): Promise<Task>;
}

export class TaskCreateFailure extends Error {
  constructor({
    temporaryId,
    text,
    isDone,
    session
  }: {
    temporaryId: string;
    text: string;
    isDone: boolean;
    session: AuthenticationSession;
  }) {
    super(
      `TaskCreateFailure: creating a task was failed. (temporaryId: ${temporaryId}, text: ${text}, isDone: ${isDone}, session: ${session})`
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default TaskCreatable;
