import firebase from 'firebase';
import { observable, action, reaction, autorun } from 'mobx';

let store: AuthStore | null = null;

class AuthStore {
  @observable public user?: firebase.User | null = undefined;
  @observable public userInfo: UserInfo | null = null;
  @observable public isLoading: boolean;

  private userListener?: () => void;
  private userInfoListener?: () => void;

  private auth = firebase.auth();
  private firestore = firebase.firestore();

  public constructor() {
    this.isLoading = true;
    reaction(
      () => this.user,
      user => {
        this.watchUserInfo(user);
      }
    );
    reaction(
      () => ({ user: this.user, userInfo: this.userInfo }),
      ({ user, userInfo }) => {
        if (user === undefined) {
          this.setIsLoading(true);
        } else if (user === null) {
          this.setIsLoading(false);
        } else if (user && !userInfo) {
          this.setIsLoading(true);
        } else {
          this.setIsLoading(false);
        }
      }
    );
    this.userListener = this.auth.onAuthStateChanged(user => {
      this.setUser(user);
    });
  }

  public get userId() {
    return this.user ? this.user.uid : null;
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
    this.user = user;
  }

  @action
  public setUserInfo(userInfo: UserInfo | null) {
    console.log(`Stored user info ${JSON.stringify(userInfo)}`);
    this.userInfo = userInfo;
  }

  @action
  public setIsLoading(isLoading: boolean) {
    console.log(`Set auth isLoading ${isLoading}`);
    this.isLoading = isLoading;
  }

  private watchUserInfo(user: firebase.User | null | undefined) {
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
