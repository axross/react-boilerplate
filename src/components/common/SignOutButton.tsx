import * as React from "react";
import AuthenticationBlocContext from "../blocContexts/AuthenticationBlocContext";
import Button from "./Button";
import ObservableRenderer from "./ObservableRenderer";
import Text from "./Text";

interface Props extends React.Attributes {
  className?: string;
}

function SignOutButton(props: Props): React.ReactElement {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  return (
    <ObservableRenderer
      observable={authenticationBloc.isProcessing}
      initialData={authenticationBloc.currentIsProcessing}
    >
      {snapshot => (
        <Button
          disabled={snapshot.data}
          onClick={() => authenticationBloc.signOut()}
          {...props}
        >
          <Text>{snapshot.data ? "Logging out..." : "Log out"}</Text>
        </Button>
      )}
    </ObservableRenderer>
  );
}

export default SignOutButton;
