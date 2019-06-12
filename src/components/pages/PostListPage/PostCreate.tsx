import styled from "@emotion/styled";
import * as React from "react";
import PostCreateBlocContext from "../../blocContexts/PostCreateBlocContext";
import NewPostForm from "../../common/NewPostForm";
import SignInForm from "../../common/SignInForm";

interface Props extends React.Attributes {
  className?: string;
}

function PostCreate(props: Props) {
  const postCreateBloc = React.useContext(PostCreateBlocContext);
  const [key, setKey] = React.useState(Math.random());

  return postCreateBloc ? (
    <_NewPostForm
      onSubmit={(_, { title, body }) => {
        postCreateBloc.createPost({ title, body });

        setKey(Math.random());
      }}
      {...props}
      key={key}
    />
  ) : (
    <_SignInForm {...props} />
  );
}

const _NewPostForm = styled(NewPostForm)`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

const _SignInForm = styled(SignInForm)`
  padding: 16px;
  background: #2f3c4c;
  border-radius: 8px;
`;

export default PostCreate;
