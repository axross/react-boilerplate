import { BehaviorSubject, Observable } from "rxjs";
import SessionStorable from "../behaviors/SessionStorable";
import Signable from "../behaviors/Signable";
import AuthenticationSession from "../entities/AuthenticationSession";

class AuthenticationBloc {
  constructor({
    sessionStorable,
    signable
  }: {
    sessionStorable: SessionStorable;
    signable: Signable;
  }) {
    this.sessionStorable = sessionStorable;
    this.signable = signable;
  }

  private sessionStorable: SessionStorable;
  private signable: Signable;
  private $session = new BehaviorSubject<AuthenticationSession | null>(null);
  private $isProcessing = new BehaviorSubject<boolean>(false);
  private $isLoadedAtLeastOnce = new BehaviorSubject<boolean>(false);

  get session(): Observable<AuthenticationSession | null> {
    return this.$session;
  }

  get currentSession(): AuthenticationSession | null {
    return this.$session.value;
  }

  get isProcessing(): Observable<boolean> {
    return this.$isProcessing;
  }

  get currentIsProcessing(): boolean {
    return this.$isProcessing.value;
  }

  async signIn(): Promise<void> {
    this.$isProcessing.next(true);

    const session = await this.signable.signIn();

    await this.sessionStorable.saveSession({ session });

    this.$session.next(session);
    this.$isProcessing.next(false);
    this.$isLoadedAtLeastOnce.next(true);
  }

  async signOut(): Promise<void> {
    this.$isProcessing.next(true);

    await this.signable.signOut();

    await this.sessionStorable.deleteSession();

    this.$session.next(null);
    this.$isProcessing.next(false);
  }

  async restoreSession(): Promise<void> {
    this.$isProcessing.next(true);

    this.$session.next(await this.sessionStorable.loadSession());
    this.$isProcessing.next(false);
    this.$isLoadedAtLeastOnce.next(true);
  }
}

export default AuthenticationBloc;
