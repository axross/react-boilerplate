import { createContext } from "react";
import TaskListBloc from "../../usecases/TaskListBloc";

const TaskListBlocContext = createContext<TaskListBloc>(undefined as any);

export default TaskListBlocContext;
