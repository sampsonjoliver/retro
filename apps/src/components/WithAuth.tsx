import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { AuthStore, AuthState } from '../services/auth';

interface Props {
  auth?: AuthStore;
  children: (
    args: {
      authState: AuthState;
      user: RetroUser;
      authService: AuthStore;
    }
  ) => React.ReactNode;
}

const Auth = (props: Props) => {
  return props.children({
    authState: props.auth!.authState,
    user: props.auth!.user,
    authService: props.auth!
  });
};

const WithAuth = inject('auth')(
  observer(Auth as React.StatelessComponent<Props>)
);

export { WithAuth };
