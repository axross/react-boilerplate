import * as React from "react";
import AuthenticationBlocContext from "./blocContexts/AuthenticationBlocContext";
import ObservableRenderer from "./common/ObservableRenderer";

interface Props {
  renderSignedIn: () => React.ReactElement;
  renderSignedOut: () => React.ReactElement;
}

function AuthenticationStateRouter({ renderSignedIn, renderSignedOut }: Props) {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  return (
    <ObservableRenderer
      observable={authenticationBloc.session}
      initialData={authenticationBloc.currentSession}
    >
      {snapshot => (snapshot.data ? renderSignedIn() : renderSignedOut())}
    </ObservableRenderer>
  );
}

export default AuthenticationStateRouter;
