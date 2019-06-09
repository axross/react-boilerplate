import * as React from "react";
import AuthenticationBlocContext from "./blocContexts/AuthenticationBlocContext";
import GlobalStyle from "./GlobalStyle";
import SignedInScene from "./scenes/SignedInScene/SignedInScene";
import SignedOutScene from "./SignedOutScene";
import SignedScreenSwitcher from "./SignedScreenSwitcher";

function Application() {
  const authenticationBloc = React.useContext(AuthenticationBlocContext);

  React.useEffect(() => {
    authenticationBloc.restoreSession();
  }, [authenticationBloc]);

  return (
    <>
      <GlobalStyle />

      <SignedScreenSwitcher
        renderSignedInChildren={() => <SignedInScene />}
        renderSignedOutChildren={() => <SignedOutScene />}
      />
    </>
  );
}

export default Application;
