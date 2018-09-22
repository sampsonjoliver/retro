import * as React from 'react';

import { CircularProgress } from '@material-ui/core';

import { WithAuth } from '../components/WithAuth';
import { WithRouter } from '../components/WithRouter';
import { AuthState } from '../services/auth';

class IndexPage extends React.Component {
  public render() {
    return (
      <WithAuth>
        {({ authState, user }) => (
          <WithRouter>
            {({ router }) => {
              if (authState === AuthState.signedIn) {
                router.history.replace({
                  pathname: '/sprint',
                  search: `?id=${user.currentSprintId}`
                });
              } else {
                router.history.replace('/login');
              }

              return <CircularProgress />;
            }}
          </WithRouter>
        )}
      </WithAuth>
    );
  }
}

export default IndexPage;
