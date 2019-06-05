import { createContext } from "react";
import AuthenticationBloc from "../../usecases/AuthenticationBloc";

const AuthenticationBlocContext = createContext<AuthenticationBloc>(
  undefined as any
);

export default AuthenticationBlocContext;
