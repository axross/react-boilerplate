import AuthenticationSession from "../entities/AuthenticationSession";

interface SessionStorable {
  saveSession(args: { session: AuthenticationSession }): Promise<void>;

  loadSession(): Promise<AuthenticationSession | null>;

  deleteSession(): Promise<void>;
}

export default SessionStorable;
