abstract class TaskId {
  abstract equal(taskId: TaskId): boolean;

  abstract toString(): string;
}

export default TaskId;
