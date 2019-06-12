import * as React from "react";
import * as ReactDOM from "react-dom";
import PostListBlocFactoryContext from "./components/blocContexts/PostListBlocFactoryContext";

async function main() {
  const {
    SESSION_ENCRYPTION_KEY,
    SESSION_STORE_KEY
  } = (window as any).__config__;

  const placeholder = document.createElement("div");

  const [
    { default: AuthenticationBlocContext },
    { default: Application },
    { default: AuthenticationApiDummy },
    { default: SessionLocalStorage },
    { default: PostApiDummy },
    { default: AuthenticationBloc },
    { default: PostListBlocFactory }
  ] = await Promise.all([
    import("./components/blocContexts/AuthenticationBlocContext"),
    import("./components/Application"),
    import("./repositories/AuthenticationApiDummy"),
    import("./repositories/SessionLocalStorage"),
    import("./repositories/PostApiDummy"),
    import("./usecases/AuthenticationBloc"),
    import("./usecases/PostListBlocFactory")
  ]);

  const authenticationApi = new AuthenticationApiDummy();
  const sessionStorable = new SessionLocalStorage({
    keyName: SESSION_STORE_KEY,
    passPhrase: SESSION_ENCRYPTION_KEY
  });
  const postApi = new PostApiDummy();

  const authenticationBloc = new AuthenticationBloc({
    sessionStorable: sessionStorable,
    signable: authenticationApi
  });

  const postListBlocFactory = new PostListBlocFactory({
    postCreatable: postApi,
    postListable: postApi
  });

  document.body.append(placeholder);

  function render() {
    const renderFunction =
      placeholder.childElementCount === 0 ? ReactDOM.render : ReactDOM.hydrate;

    renderFunction(
      React.createElement(
        AuthenticationBlocContext.Provider,
        { value: authenticationBloc },
        React.createElement(
          PostListBlocFactoryContext.Provider,
          { value: postListBlocFactory },
          React.createElement(Application)
        )
      ),
      placeholder
    );
  }

  render();
}

document.addEventListener("DOMContentLoaded", main);
