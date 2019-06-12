import styled from "@emotion/styled";
import * as React from "react";
import Post from "../../entities/Post";
import Text from "./Text";
import LoadingSpinner from "./LoadingSpinner";

interface Props extends React.Attributes {
  post: Post;
  loading?: boolean;
  className?: string;
}

function PostSummary({ post, loading = false, ...props }: Props) {
  return (
    <Root {...props}>
      <PostTitle maxLines={1}>{post.title}</PostTitle>

      <PostBody maxLines={3}>{post.body}</PostBody>

      {loading ? <Loading /> : null}
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas: "title loading" "body body";
`;

const PostTitle = styled(Text)`
  grid-area: title;
  margin-bottom: 8px;
  font-size: 24px;
`;

const PostBody = styled(Text)`
  grid-area: body;
`;

const Loading = styled(LoadingSpinner)`
  grid-area: loading;
`;

export default PostSummary;
