import * as firebase from 'firebase';
import { observable, action, reaction, computed } from 'mobx';

let store: AuthStore | null = null;

export enum AuthState {
  signedOut,
  resolving,
  loading,
  signedIn
}

class AuthStore {
  @observable private _user?: firebase.User | null = undefined;
  @observable private _userInfo: UserInfo | null = null;

  @computed
  public get user(): RetroUser {
    return {
      ...this._user,
      ...this._userInfo
    };
  }

  @computed
  public get authState() {
    if (this._user === null) {
      return AuthState.signedOut;
    } else if (this._user === undefined) {
      return AuthState.resolving;
    } else if (!!this._user && !this._userInfo) {
      return AuthState.loading;
    } else {
      return AuthState.signedIn;
    }
  }

  private userInfoListener?: () => void;

  private auth = firebase.auth();
  private firestore = firebase.firestore();

  public constructor() {
    reaction(
      () => this._user,
      user => {
        this.loadUser(user);
      }
    );
    this.auth.onAuthStateChanged(user => {
      this.setUser(user);
    });
  }

  public signInAnonymously() {
    this.auth.signInAnonymously();
  }

  public signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  public signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  public async linkAnonymousAccountWithGoogle() {
    const idToken = await this.auth.currentUser!.getIdToken();

    const linkedUser = await this.auth.currentUser!.linkAndRetrieveDataWithCredential(
      firebase.auth.GoogleAuthProvider.credential(idToken)
    );

    this.setUser(linkedUser.user);
  }

  public async linkAnonymousAccountWithFacebook() {
    const idToken = await this.auth.currentUser!.getIdToken();

    const linkedUser = await this.auth.currentUser!.linkAndRetrieveDataWithCredential(
      firebase.auth.FacebookAuthProvider.credential(idToken)
    );

    this.setUser(linkedUser.user);
  }

  public signOut() {
    this.auth.signOut();
  }

  @action
  public setUser(user: firebase.User | null) {
    console.log(`Signed in as ${(user || { uid: 'null' }).uid}`);
    this._user = user;
  }

  @action
  public setUserInfo(userInfo: UserInfo | null) {
    console.log(`Stored user info ${JSON.stringify(userInfo)}`);
    this._userInfo = userInfo;
  }

  private loadUser(user: firebase.User | null | undefined) {
    this.disposeUserInfoListener();
    console.log(`Listening for user info on ${(user || { uid: '' }).uid}`);

    if (user) {
      this.userInfoListener = this.firestore
        .collection('users')
        .doc(user.uid)
        .onSnapshot(snapshot => {
          this.setUserInfo(snapshot.data() as UserInfo);
        });
    } else {
      this.setUserInfo(null);
    }
  }

  private disposeUserInfoListener() {
    if (this.userInfoListener) {
      this.userInfoListener();
      this.userInfoListener = undefined;
    }
  }
}

function initStore() {
  if (store === null) {
    store = new AuthStore();
  }
  return store;
}

export { AuthStore, initStore };
