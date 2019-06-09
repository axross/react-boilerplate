import styled from "@emotion/styled";
import { Router } from "@reach/router";
import * as React from "react";
import DocumentTitle from "../../common/DocumentTitle";
import NavigationBar from "../../common/NavigationBar";
import SignOutButton from "../../common/SignOutButton";
import TaskListRoute from "../../routes/TaskListRoute";

function SignedInScene(): React.ReactElement {
  return (
    <>
      <DocumentTitle title="Clean React" />

      <NavigationBar title="Clean React" actions={<SignOutButton />} />

      <React.Suspense fallback={<span>loading...</span>}>
        <Root>
          <Router>
            <TaskListRoute path="/" />
          </Router>
        </Root>
      </React.Suspense>
    </>
  );
}

const Root = styled.div`
  width: 800px;
  margin: 0 auto;
`;

export default SignedInScene;
