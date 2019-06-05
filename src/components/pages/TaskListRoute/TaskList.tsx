import styled from "@emotion/styled";
import * as React from "react";
import TaskListBlocContext from "../../blocContexts/TaskListBlocContext";
import ObservableRenderer from "../../common/ObservableRenderer";
import TaskCreateInput from "./TaskCreateInput";
import TaskListItem from "./TaskListItem";

interface Props extends React.Attributes {
  className?: string;
}

function TaskList(props: Props): React.ReactElement {
  const taskListBloc = React.useContext(TaskListBlocContext);

  return (
    <Root {...props}>
      <List>
        <ObservableRenderer
          observable={taskListBloc.tasks}
          initialData={taskListBloc.currentTasks}
        >
          {tasksSnapshot => (
            <ObservableRenderer
              observable={taskListBloc.updatingTasks}
              initialData={taskListBloc.currentUpdatingTasks}
            >
              {updatingTasksSnapshot => (
                <>
                  {tasksSnapshot.data.map(task => (
                    <TaskListItem
                      task={task}
                      updating={updatingTasksSnapshot.data.includes(task)}
                      key={task.id.toString()}
                    />
                  ))}
                </>
              )}
            </ObservableRenderer>
          )}
        </ObservableRenderer>
      </List>

      <_TaskCreateInput />
    </Root>
  );
}

const Root = styled.ul`
  padding: 16px;
  border: 1px #dfe4ea solid;
  border-radius: 3px;
  box-shadow: #f1f2f6 0px 0px 0px 1px, #f1f2f6 0px 2px 4px;
  border-radius: 4px;
`;

const List = styled.ul`
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
`;

const _TaskCreateInput = styled(TaskCreateInput)`
  margin-top: 16px;
`;

export default TaskList;
