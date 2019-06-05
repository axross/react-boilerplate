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
        label={
          <CheckboxLabel>
            <Text lineThrough={task.isDone}>{task.text}</Text>
          </CheckboxLabel>
        }
      />

      {updating ? <LoadingSpinner /> : null}

      <__Button
        color={ButtonColor.secondary}
        onClick={() => taskListBloc.delete(task)}
      >
        <Text>Delete</Text>
      </__Button>
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

const _Button = styled(Button)`
  padding: 16px 24px;
`;

const __Button = styled(_Button)`
  padding: 20px 24px;
`;

export default TaskListItem;
