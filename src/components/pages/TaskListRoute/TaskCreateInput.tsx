import styled from "@emotion/styled";
import * as React from "react";
import TaskListBlocContext from "../../blocContexts/TaskListBlocContext";
import Button from "../../common/Button";
import Text from "../../common/Text";
import TextInput from "../../common/TextInput";

interface Props extends React.Attributes {
  className?: string;
}

function TaskCreateInput(props: Props): React.ReactElement {
  const taskListBloc = React.useContext(TaskListBlocContext);
  const [textState, setTextState] = React.useState("");
  const textInputRef = React.useRef<HTMLInputElement>(null);

  function onSubmit() {
    taskListBloc.addByText(textState);

    textInputRef.current!.value = "";
    textInputRef.current!.focus();
  }

  return (
    <Root {...props}>
      <TextInput
        ref={textInputRef}
        onChange={(_, value) => setTextState(value)}
        onEnterKeyDown={(_, __) => onSubmit()}
      />

      <Button onClick={() => onSubmit()}>
        <Text>Add</Text>
      </Button>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-start;
  column-gap: 8px;
`;

export default TaskCreateInput;
