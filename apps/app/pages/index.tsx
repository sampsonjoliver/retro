import React from 'react';
import { Context } from 'next/document';
import { withRouter, SingletonRouter } from 'next/router';

import { initializePage } from '../utils/initialisePage';
import { WithAuth } from '../components/WithAuth';
import { WithRouter } from '../components/WithRouter';
import { AuthState } from '../services/auth';
import { CircularProgress } from '@material-ui/core';

interface PageProps extends Context {
  isServer: boolean;
  router: SingletonRouter;
}

class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    return (
      <WithAuth>
        {({ authState, user }) => (
          <WithRouter>
            {({ router }) => {
              if (authState === AuthState.signedIn) {
                router.replace({
                  pathname: '/sprint',
                  query: { id: user.currentSprintId }
                });
              } else {
                router.replace('/login');
              }

              return <CircularProgress />;
            }}
          </WithRouter>
        )}
      </WithAuth>
    );
  }
}

const IndexWithRouter = withRouter(Index);
export default initializePage(IndexWithRouter);
