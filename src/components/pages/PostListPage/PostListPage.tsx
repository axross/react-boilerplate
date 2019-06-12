import styled from "@emotion/styled";
import * as React from "react";
import Text, { TextHeadingLevel } from "../../common/Text";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import TextThemeContext from "../../common/TextThemeContext";

function PostListPage(): React.ReactElement {
  return (
    <TextThemeContext.Provider value={{ color: "#fff" }}>
      <Root>
        <Content>
          <Heading headingLevel={TextHeadingLevel.h1} selectable={false}>
            Posts
          </Heading>

          <_PostCreate />

          <PostList />
        </Content>
      </Root>
    </TextThemeContext.Provider>
  );
}

const Root = styled.div`
  background: #222f3e;
`;

const Content = styled.div`
  width: 800px;
  margin: 0 auto;
  padding: 16px 0;
`;

const Heading = styled(Text)`
  margin-bottom: 16px;
  font-size: 32px;
  font-weight: bold;
`;

const _PostCreate = styled(PostCreate)`
  margin-bottom: 16px;
`;

export default PostListPage;
