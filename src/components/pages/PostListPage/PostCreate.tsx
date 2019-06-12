import styled from "@emotion/styled";
import * as React from "react";
import PostCreateBlocContext from "../../blocContexts/PostCreateBlocContext";
import NewPostForm from "../../common/NewPostForm";
import Text from "../../common/Text";

interface Props extends React.Attributes {
  className?: string;
}

function PostCreate(props: Props) {
  const postCreateBloc = React.useContext(PostCreateBlocContext);
  const [key, setKey] = React.useState(Math.random());

  return postCreateBloc ? (
    <Form
      onSubmit={(_, { title, body }) => {
        postCreateBloc.createPost({ title, body });

        setKey(Math.random());
      }}
      {...props}
      key={key}
    />
  ) : (
    <MessageWhenSignedOut {...props}>
      <Text>Sign in to post</Text>
    </MessageWhenSignedOut>
  );
}

const Form = styled(NewPostForm)`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

const MessageWhenSignedOut = styled.div`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

export default PostCreate;
