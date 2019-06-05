import AuthenticationSession from "../entities/AuthenticationSession";

interface Signable {
  signIn(): Promise<AuthenticationSession>;

  signOut(): Promise<void>;
}

export default Signable;
