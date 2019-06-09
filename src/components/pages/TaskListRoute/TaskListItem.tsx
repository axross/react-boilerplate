import styled from "@emotion/styled";
import * as React from "react";
import Task from "../../../entities/Task";
import TaskListBlocContext from "../../blocContexts/TaskListBlocContext";
import Button, { ButtonColor } from "../../common/Button";
import Checkbox from "../../common/Checkbox";
import CheckboxLabel from "../../common/CheckboxLabel";
import Text from "../../common/Text";
import LoadingSpinner from "../../common/LoadingSpinner";

interface Props extends React.Attributes {
  task: Task;
  updating?: boolean;
  className?: string;
}

function TaskListItem({ task, updating, ...props }: Props): React.ReactElement {
  const taskListBloc = React.useContext(TaskListBlocContext);

  return (
    <Root {...props}>
      <Checkbox
        onChange={(_, isChecked) =>
          taskListBloc.setChecked({ task, isDone: isChecked })
        }
        checked={task.isDone}
        disable={updating}
        label={
          <CheckboxLabel>
            <Text>{task.text}</Text>
          </CheckboxLabel>
        }
      />

      {updating ? <LoadingSpinner /> : null}

      <Button
        color={ButtonColor.secondary}
        onClick={() => taskListBloc.delete(task)}
      >
        <Text>Delete</Text>
      </Button>
    </Root>
  );
}

const Root = styled.li`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: 32px;
  padding: 8px 0;
  border-bottom: 1px #dfe4ea solid;
`;

export default TaskListItem;
