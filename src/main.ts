import * as React from "react";
import * as ReactDOM from "react-dom";

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
    { default: TaskApiDummy },
    { default: AuthenticationBloc },
    { default: TaskListBlocFactory }
  ] = await Promise.all([
    import("./components/blocContexts/AuthenticationBlocContext"),
    import("./components/blocContexts/TaskListBlocFactoryContext"),
    import("./components/Application"),
    import("./repositories/AuthenticationApiDummy"),
    import("./repositories/SessionLocalStorage"),
    import("./repositories/TaskApiDummy"),
    import("./usecases/AuthenticationBloc"),
    import("./usecases/TaskListBlocFactory")
  ]);

  const authenticationApi = new AuthenticationApiDummy();
  const sessionStorable = new SessionLocalStorage({
    keyName: SESSION_STORE_KEY,
    passPhrase: SESSION_ENCRYPTION_KEY
  });
  const taskApi = new TaskApiDummy();

  const authenticationBloc = new AuthenticationBloc({
    sessionStorable: sessionStorable,
    signable: authenticationApi
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
        {
          value: authenticationBloc
        },
        React.createElement(
          TaskListBlocFactoryContext.Provider,
          { value: taskListBlocFactory },
          React.createElement(Application)
        )
      ),
      placeholder
    );
  }

  render();
}

document.addEventListener("DOMContentLoaded", main);
