import * as React from "react";
import * as ReactDOM from "react-dom";
import Application from "./components/Application";
import AuthenticationBlocContext from "./components/blocContexts/AuthenticationBlocContext";
import PostCreateBlocFactoryContext from "./components/blocContexts/PostCreateBlocFactoryContext";
import PostListBlocFactoryContext from "./components/blocContexts/PostListBlocFactoryContext";
import AuthenticationApiDummy from "./repositories/AuthenticationApiDummy";
import SessionLocalStorage from "./repositories/SessionLocalStorage";
import PostApiDummy from "./repositories/PostApiDummy";
import AuthenticationBloc from "./usecases/AuthenticationBloc";
import PostCreateBlocFactory from "./usecases/PostCreateBlocFactory";
import PostListBlocFactory from "./usecases/PostListBlocFactory";
import PostListStore from "./repositories/PostListStore";

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
  const postListStore = new PostListStore();
  const postApi = new PostApiDummy();

  const authenticationBloc = new AuthenticationBloc({
    sessionStorable: sessionStorable,
    signable: authenticationApi
  });

  const postCreateBlocFactory = new PostCreateBlocFactory({
    postCreatable: postApi,
    postListTemporaryStorable: postListStore
  });

  const postListBlocFactory = new PostListBlocFactory({
    postListable: postApi,
    postListTemporaryStorable: postListStore
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
          PostCreateBlocFactoryContext.Provider,
          { value: postCreateBlocFactory },
          React.createElement(
            PostListBlocFactoryContext.Provider,
            { value: postListBlocFactory },
            React.createElement(Application)
          )
        )
      ),
      placeholder
    );
  }

  render();
}

document.addEventListener("DOMContentLoaded", main);
