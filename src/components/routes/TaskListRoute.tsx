import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import TaskListBlocContext from "../blocContexts/TaskListBlocContext";
import TaskListBlocFactoryContext from "../blocContexts/TaskListBlocFactoryContext";
import AuthenticationBlocContext from "../blocContexts/AuthenticationBlocContext";
import DocumentTitle from "../common/DocumentTitle";

const TaskListRoute = React.lazy(async () => {
  const { default: TaskListPage } = await import(
    "../pages/TaskListRoute/TaskListPage"
  );

  function TaskListRoute({  }: RouteComponentProps): React.ReactElement {
    const authenticationBloc = React.useContext(AuthenticationBlocContext);
    const taskListBlocFactory = React.useContext(TaskListBlocFactoryContext);

    const taskListBloc = React.useMemo(
      () =>
        taskListBlocFactory.create({
          session: authenticationBloc.currentSession!
        }),

      []
    );

    React.useEffect(() => {
      taskListBloc.initialize();

      return () => {
        taskListBloc.dispose();
      };
    }, []);

    return (
      <>
        <DocumentTitle title="Tasks | React Boilerplate" />

        <TaskListBlocContext.Provider value={taskListBloc}>
          <TaskListPage />
        </TaskListBlocContext.Provider>
      </>
    );
  }

  return { default: TaskListRoute };
});

export default TaskListRoute;
