import * as React from "react";
import DocumentTitle from "./common/DocumentTitle";
import SignInButton from "./common/SignInButton";

function SignedOutScene(): React.ReactElement {
  return (
    <>
      <DocumentTitle title="Login | React Boilerplate" />

      <SignInButton />
    </>
  );
}

export default SignedOutScene;
