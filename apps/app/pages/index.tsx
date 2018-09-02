import React from 'react';
import { Context } from 'next/document';
import { withRouter, SingletonRouter } from 'next/router';

import { App } from '../components/App';
import { TaskInput } from '../components/TaskInput';
import { initializePage } from '../utils/initialisePage';
import { inject, observer } from 'mobx-react';
import { AuthStore } from '../services/auth';
import { CircularProgress } from '@material-ui/core';

interface PageProps extends Context {
  isServer: boolean;
  router: SingletonRouter;
  auth?: AuthStore;
}

@inject('auth')
@observer
class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    const auth = this.props.auth!;
    if (!auth.isLoading) {
      if (auth.user && auth.userInfo) {
        console.log('Redirecting to sprint');
        this.props.router.replace({
          pathname: '/sprint',
          query: { id: auth.userInfo!.currentSprintId }
        });
      } else {
        console.log('Redirecting to login');
        this.props.router.replace('/login');
      }
    }

    return (
      <div>
        Loading user profile
        <CircularProgress />
      </div>
    );
  }
}

const IndexWithRouter = withRouter(Index);
export default initializePage(IndexWithRouter);
