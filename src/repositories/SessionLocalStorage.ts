import { AES } from "crypto-js";
import SessionStorable from "../behaviors/SessionStorable";
import AuthenticationSession from "../entities/AuthenticationSession";

class SessionLocalStorage implements SessionStorable {
  constructor({
    keyName,
    passPhrase
  }: {
    keyName: string;
    passPhrase: string;
  }) {
    this.storage = window.localStorage;
    this.keyName = keyName;
    this.passPhrase = passPhrase;
  }

  private readonly storage: Storage;

  private readonly keyName: string;

  private readonly passPhrase: string;

  async loadSession(): Promise<AuthenticationSession | null> {
    const storedValue = this.storage.getItem(this.keyName);

    if (storedValue === null) {
      return null;
    }

    const token = AES.decrypt(storedValue, this.passPhrase).toString();

    return new LocalStorageAuthenticationSession(token);
  }

  async saveSession({
    session
  }: {
    session: AuthenticationSession;
  }): Promise<void> {
    this.storage.setItem(
      this.keyName,
      AES.encrypt(session.token, this.passPhrase).toString()
    );
  }
}

class LocalStorageAuthenticationSession implements AuthenticationSession {
  constructor(public token: string) {}
}

export default SessionLocalStorage;
