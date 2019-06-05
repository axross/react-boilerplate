import * as React from "react";
import AuthenticationBlocContext from "./blocContexts/AuthenticationBlocContext";
import ObservableRenderer from "./common/ObservableRenderer";

function SignedScreenSwitcher({
  renderSignedInChildren,
  renderSignedOutChildren
}: {
  renderSignedInChildren: () => React.ReactElement;
  renderSignedOutChildren: () => React.ReactElement;
}): React.ReactElement {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  return (
    <ObservableRenderer
      observable={authenticationBloc.session}
      initialData={authenticationBloc.currentSession}
    >
      {snapshot =>
        snapshot.data ? renderSignedInChildren() : renderSignedOutChildren()
      }
    </ObservableRenderer>
  );
}

export default SignedScreenSwitcher;
