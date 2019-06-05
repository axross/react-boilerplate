import * as React from "react";
import Text, { TextHeadingLevel } from "../../common/Text";
import TaskList from "./TaskList";

function TaskListPage(): React.ReactElement {
  return (
    <>
      <Text headingLevel={TextHeadingLevel.h1}>Tasks</Text>

      <TaskList />
    </>
  );
}

export default TaskListPage;
