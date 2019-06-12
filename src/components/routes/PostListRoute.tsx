import { RouteComponentProps } from "@reach/router";
import * as React from "react";
import PostListBlocContext from "../blocContexts/PostListBlocContext";
import PostListBlocFactoryContext from "../blocContexts/PostListBlocFactoryContext";
import AuthenticationBlocContext from "../blocContexts/AuthenticationBlocContext";
import DocumentBackgroundColor from "../common/DocumentBackgroundColor";
import DocumentTitle from "../common/DocumentTitle";

const PostListRoute = React.lazy(async () => {
  const { default: PostListPage } = await import(
    "../pages/PostListPage/PostListPage"
  );

  function PostListRoute({  }: RouteComponentProps): React.ReactElement {
    const authenticationBloc = React.useContext(AuthenticationBlocContext);
    const postListBlocFactory = React.useContext(PostListBlocFactoryContext);

    const postListBloc = React.useMemo(
      () =>
        postListBlocFactory.create({
          session: authenticationBloc.currentSession!
        }),
      []
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

        <PostListBlocContext.Provider value={postListBloc}>
          <PostListPage />
        </PostListBlocContext.Provider>
      </>
    );
  }

  return { default: PostListRoute };
});

export default PostListRoute;
