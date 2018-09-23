import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { AuthService, AuthState } from '../services/auth';

interface Props {
  AuthService?: AuthService;
  children: (
    args: {
      authState: AuthState;
      user: RetroUser;
      authService: AuthService;
    }
  ) => React.ReactNode;
}

const Auth = (props: Props) => {
  return props.children({
    authState: props.AuthService!.authState,
    user: props.AuthService!.user,
    authService: props.AuthService!
  });
};

const WithAuth = inject('AuthService')(
  observer(Auth as React.StatelessComponent<Props>)
);

export { WithAuth };
