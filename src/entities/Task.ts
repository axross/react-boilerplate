import TaskId from "./TaskId";

abstract class Task {
  constructor({ id }: { id: TaskId }) {
    this.id = id;
  }

  readonly id: TaskId;

  abstract readonly text: string;

  abstract readonly isDone: boolean;

  equal(task: Task) {
    return task.id.equal(this.id);
  }
}

export default Task;
