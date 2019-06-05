import AuthenticationSession from "../entities/AuthenticationSession";
import Task from "../entities/Task";

interface TaskListable {
  getAllTasks(args: { session: AuthenticationSession }): Promise<Task[]>;
}

export class TaskListFailure extends Error {
  constructor({ session }: { session: AuthenticationSession }) {
    super(
      `TaskListFailure: listing tasks up was failed. (session: ${session})`
    );

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default TaskListable;
