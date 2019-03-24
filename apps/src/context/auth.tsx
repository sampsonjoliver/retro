import * as React from 'react';
import { auth, firestore } from 'firebase';

export type AuthStateHook = {
  isLoading: boolean;
  user: (firebase.User & UserInfo) | null;
};

let cachedUser: (firebase.User & UserInfo) | null = null;

export const useAuth = (
  fbAuth: auth.Auth,
  fbFirestore: firestore.Firestore
) => {
  const [authState, setState] = React.useState<AuthStateHook>({
    isLoading: true,
    user: cachedUser
  });

  React.useEffect(
    () => {
      let userInfoUnsub: null | (() => void) = null;

      const userInfoListener = (user: firebase.User) => {
        return fbFirestore
          .collection('users')
          .doc(user.uid)
          .onSnapshot(snapshot => {
            const userInfo = snapshot.data() as UserInfo;
            cachedUser = { ...user, ...userInfo };
            setState({ isLoading: false, user: cachedUser });
          });
      };

      const authUnsub = fbAuth.onAuthStateChanged(newUser => {
        if (newUser) {
          if (userInfoUnsub) {
            userInfoUnsub();
          }
          userInfoUnsub = userInfoListener(newUser);
        } else {
          setState({ isLoading: false, user: newUser });
        }
      });

      const unsubscribe = () => {
        authUnsub();
        if (userInfoUnsub) {
          userInfoUnsub();
        }
      };

      return unsubscribe;
    },
    [fbAuth]
  );
  return authState;
};

export const AuthContext = React.createContext<AuthStateHook>({
  isLoading: false,
  user: null
});

export const AuthProvider: React.StatelessComponent = props => {
  const authData = useAuth(auth(), firestore());

  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
};
