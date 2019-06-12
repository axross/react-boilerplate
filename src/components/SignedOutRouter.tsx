import styled from "@emotion/styled";
import { Match } from "@reach/router";
import * as React from "react";
import NavigationBar from "./common/NavigationBar";

interface Props {
  renderPostList: () => React.ReactElement;
}

function SignedOutRouter({ renderPostList }: Props): React.ReactElement {
  return (
    <Root>
      <_NavigationBar title="Clean React" />

      <Content>
        <Match path="/">{() => renderPostList()}</Match>
      </Content>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: "navigationBar" "content";
`;

const _NavigationBar = styled(NavigationBar)`
  grid-area: navigationBar;
`;

const Content = styled.div`
  grid-area: content;
  overflow-y: scroll;
`;

export default SignedOutRouter;
