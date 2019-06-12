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
    { default: TaskListBlocFactoryContext },
    { default: Application },
    { default: AuthenticationApiDummy },
    { default: SessionLocalStorage },
    { default: PostApiDummy },
    { default: TaskApiDummy },
    { default: AuthenticationBloc },
    { default: PostListBlocFactory },
    { default: TaskListBlocFactory }
  ] = await Promise.all([
    import("./components/blocContexts/AuthenticationBlocContext"),
    import("./components/blocContexts/TaskListBlocFactoryContext"),
    import("./components/Application"),
    import("./repositories/AuthenticationApiDummy"),
    import("./repositories/SessionLocalStorage"),
    import("./repositories/PostApiDummy"),
    import("./repositories/TaskApiDummy"),
    import("./usecases/AuthenticationBloc"),
    import("./usecases/PostListBlocFactory"),
    import("./usecases/TaskListBlocFactory")
  ]);

  const authenticationApi = new AuthenticationApiDummy();
  const sessionStorable = new SessionLocalStorage({
    keyName: SESSION_STORE_KEY,
    passPhrase: SESSION_ENCRYPTION_KEY
  });
  const postApi = new PostApiDummy();
  const taskApi = new TaskApiDummy();

  const authenticationBloc = new AuthenticationBloc({
    sessionStorable: sessionStorable,
    signable: authenticationApi
  });

  const postListBlocFactory = new PostListBlocFactory({
    postCreatable: postApi,
    postListable: postApi
  });

  const taskListBlocFactory = new TaskListBlocFactory({
    taskCreatable: taskApi,
    taskDeletable: taskApi,
    taskListable: taskApi,
    taskUpdatable: taskApi
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
          React.createElement(
            TaskListBlocFactoryContext.Provider,
            { value: taskListBlocFactory },
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
