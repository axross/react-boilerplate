import * as React from "react";
import PostCreateBlocContext from "../blocContexts/PostCreateBlocContext";
import PostCreateBlocFactoryContext from "../blocContexts/PostCreateBlocFactoryContext";
import PostListBlocContext from "../blocContexts/PostListBlocContext";
import PostListBlocFactoryContext from "../blocContexts/PostListBlocFactoryContext";
import AuthenticationBlocContext from "../blocContexts/AuthenticationBlocContext";
import DocumentBackgroundColor from "../common/DocumentBackgroundColor";
import DocumentTitle from "../common/DocumentTitle";
import PostListPage from "../pages/PostListPage";

interface Props {}

function PostListRoute({  }: Props): React.ReactElement {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);
  const postCreateBlocFactory = React.useContext(PostCreateBlocFactoryContext);
  const postListBlocFactory = React.useContext(PostListBlocFactoryContext);

  const [postCreateBloc, postListBloc] = React.useMemo(
    () => [
      authenticationBloc.currentSession
        ? postCreateBlocFactory.create({
            session: authenticationBloc.currentSession!
          })
        : null,
      postListBlocFactory.create()
    ],
    [authenticationBloc.currentSession]
  );

  React.useEffect(() => {
    postListBloc.initialize();

    return () => {
      postListBloc.dispose();
    };
  }, []);

  return (
    <>
      <DocumentTitle title="Posts | Clean React" />

      <DocumentBackgroundColor color="#222f3e" />

      {postCreateBloc ? (
        <PostCreateBlocContext.Provider value={postCreateBloc}>
          <PostListBlocContext.Provider value={postListBloc}>
            <PostListPage />
          </PostListBlocContext.Provider>
        </PostCreateBlocContext.Provider>
      ) : (
        <PostListBlocContext.Provider value={postListBloc}>
          <PostListPage />
        </PostListBlocContext.Provider>
      )}
    </>
  );
}

export default PostListRoute;
