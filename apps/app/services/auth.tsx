import firebase from 'firebase';
import { observable, action, reaction } from 'mobx';

let store: AuthStore | null = null;

class AuthStore {
  @observable public user: firebase.User | null = null;
  @observable public userInfo: UserInfo | null = null;

  private userListener?: () => void;
  private userInfoListener?: () => void;

  private auth = firebase.auth();
  private firestore = firebase.firestore();

  public constructor() {
    reaction(() => this.user, user => this.watchUserInfo(user));
    this.userListener = this.auth.onAuthStateChanged(user =>
      this.setUser(user)
    );
  }

  public signInAnonymously() {
    this.auth.signInAnonymously();
  }

  public signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider);
  }

  public signOut() {
    this.auth.signOut();
  }

  @action
  public setUser(user: firebase.User | null) {
    console.log(`Signed in as ${(user || { uid: 'null' }).uid}`);
    this.user = user;
  }

  @action
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

function initStore() {
  if (store === null) {
    store = new AuthStore();
  }
  return store;
}

export { AuthStore, initStore };
