import * as React from "react";
import AuthenticationBlocContext from "../blocContexts/AuthenticationBlocContext";
import Button from "./Button";
import ObservableRenderer from "./ObservableRenderer";
import Text from "./Text";

interface Props extends React.Attributes {
  className?: string;
}

function SignInButton(props: Props): React.ReactElement {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  return (
    <ObservableRenderer
      observable={authenticationBloc.isProcessing}
      initialData={authenticationBloc.currentIsProcessing}
    >
      {snapshot => (
        <Button
          disabled={snapshot.data}
          onClick={() => authenticationBloc.signIn()}
          {...props}
        >
          <Text>{snapshot.data ? "Logging in..." : "Log in"}</Text>
        </Button>
      )}
    </ObservableRenderer>
  );
}

export default SignInButton;
