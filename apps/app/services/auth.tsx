import firebase from './firebase';
import { decorate, observable, action, autorun, reaction, when } from 'mobx';

class AuthStore {
  public user: firebase.User | null = null;
  public userInfo: UserInfo | null = null;
  private userInfoListener?: () => void;

  private auth = firebase.auth();
  private firestore = firebase.firestore();

  public constructor() {
    reaction(() => this.user, user => this.watchUserInfo(user));
    when(() => this.user != null, () => this.watchUserInfo(this.user));
    this.auth.onAuthStateChanged(user => this.setAuthState(user));
  }

  public signInAnonymously() {
    this.auth.signInAnonymously();
  }

  public signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  public signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  public setAuthState(user: firebase.User | null) {
    console.log(`Signed in as ${(user || { uid: 'null' }).uid}`);
    this.user = user;
  }

  public setUserInfo(userInfo: UserInfo | null) {
    console.log(`Stored user info ${JSON.stringify(userInfo)}`);
    this.userInfo = userInfo;
  }

  private watchUserInfo(user: firebase.User | null) {
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

decorate(AuthStore, {
  user: observable,
  userInfo: observable,
  setAuthState: action,
  setUserInfo: action
});

export { AuthStore };
