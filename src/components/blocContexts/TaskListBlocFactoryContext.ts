import { createContext } from "react";
import TaskListBlocFactory from "../../usecases/TaskListBlocFactory";

const TaskListBlocFactoryContext = createContext<TaskListBlocFactory>(
  undefined as any
);

export default TaskListBlocFactoryContext;
