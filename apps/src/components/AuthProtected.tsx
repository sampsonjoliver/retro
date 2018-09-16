import * as React from 'react';

import { AuthState } from '../services/auth';
import { WithAuth } from './WithAuth';
import { WithRouter } from './WithRouter';

const AuthProtected: React.StatelessComponent<{}> = ({ children }) => {
  return (
    <WithAuth>
      {({ authState }) => {
        return (
          <WithRouter>
            {({ router }) => {
              if (authState === AuthState.signedIn) {
                return <>{children}</>;
              }
              if (router.location.pathname !== '/login') {
                router.history.replace('/login');
              }
              return <div />;
            }}
          </WithRouter>
        );
      }}
    </WithAuth>
  );
};

export { AuthProtected };
