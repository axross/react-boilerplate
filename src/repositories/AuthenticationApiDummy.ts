import Signable from "../behaviors/Signable";
import AuthenticationSession from "../entities/AuthenticationSession";

class AuthenticationApiDummy implements Signable {
  signIn(): Promise<AuthenticationSession> {
    return new Promise(resolve =>
      setTimeout(() => resolve(new ApiAuthenticationSession("abcd1234")), 2000)
    );
  }

  signOut(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

class ApiAuthenticationSession implements AuthenticationSession {
  constructor(public token: string) {}
}

export default AuthenticationApiDummy;
