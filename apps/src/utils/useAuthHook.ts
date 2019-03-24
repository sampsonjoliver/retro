import { useState, useEffect } from 'react';
import { auth, firestore } from 'firebase';

type AuthStateHook = {
  isLoading: boolean;
  user: (firebase.User & UserInfo) | null;
};

let cachedUser: (firebase.User & UserInfo) | null = null;

const useAuth = (fbAuth: auth.Auth, fbFirestore: firestore.Firestore) => {
  const [authState, setState] = useState<AuthStateHook>({
    isLoading: true,
    user: cachedUser
  });

  useEffect(
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

export { useAuth };
