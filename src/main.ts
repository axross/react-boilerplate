import * as React from "react";
import * as ReactDOM from "react-dom";
import Application from "./components/Application";
import AuthenticationBlocContext from "./components/blocContexts/AuthenticationBlocContext";
import PostListBlocFactoryContext from "./components/blocContexts/PostListBlocFactoryContext";
import AuthenticationApiDummy from "./repositories/AuthenticationApiDummy";
import SessionLocalStorage from "./repositories/SessionLocalStorage";
import PostApiDummy from "./repositories/PostApiDummy";
import AuthenticationBloc from "./usecases/AuthenticationBloc";
import PostListBlocFactory from "./usecases/PostListBlocFactory";

async function main() {
  const {
    SESSION_ENCRYPTION_KEY,
    SESSION_STORE_KEY
  } = (window as any).__config__;

  const placeholder = document.createElement("div");

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
