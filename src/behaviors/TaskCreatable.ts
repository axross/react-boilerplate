import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";
import TaskId from "../entities/TaskId";

interface TaskCreatable {
  createTask(args: {
    temporaryId: TaskId;
    text: string;
    isDone: boolean;
    session: AuthenticationSession;
  }): CreatingTaskReference;
}

export abstract class CreatingTaskReference {
  constructor({
    temporaryId,
    payload
  }: {
    temporaryId: TaskId;
    payload: Promise<Task>;
  }) {
    this.temporaryId = temporaryId;
    this.payload = payload;
  }

  readonly temporaryId: TaskId;

  readonly payload: Promise<Task>;
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
