import { LocationProvider } from "@reach/router";
import * as React from "react";
import AuthenticationBlocContext from "./blocContexts/AuthenticationBlocContext";
import GlobalStyle from "./GlobalStyle";
import SignedInRouter from "./SignedInRouter";
import SignedOutRouter from "./SignedOutRouter";
import AuthenticationStateRouter from "./AuthenticationStateRouter";

const PostListRoute = React.lazy(() => import("./routes/PostListRoute"));

function Application() {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  React.useEffect(() => {
    authenticationBloc.restoreSession();
  }, [authenticationBloc]);

  return (
    <>
      <GlobalStyle />

      <LocationProvider>
        <AuthenticationStateRouter
          renderSignedIn={() => (
            <React.Suspense fallback={<span>Loading...</span>}>
              <SignedInRouter renderPostList={() => <PostListRoute />} />
            </React.Suspense>
          )}
          renderSignedOut={() => (
            <React.Suspense fallback={<span>Loading...</span>}>
              <SignedOutRouter renderPostList={() => <PostListRoute />} />
            </React.Suspense>
          )}
        />
      </LocationProvider>
    </>
  );
}

export default Application;
