import * as React from "react";
import PostListBlocContext from "../../blocContexts/PostListBlocContext";
import NewPostForm from "../../common/NewPostForm";
import styled from "@emotion/styled";

interface Props extends React.Attributes {
  className?: string;
}

function PostCreate(props: Props) {
  const postListBloc = React.useContext(PostListBlocContext);
  const [key, setKey] = React.useState(Math.random());

  return (
    <Form
      onSubmit={(_, { title, body }) => {
        postListBloc.createPost({ title, body });

        setKey(Math.random());
      }}
      {...props}
      key={key}
    />
  );
}

const Form = styled(NewPostForm)`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

export default PostCreate;
