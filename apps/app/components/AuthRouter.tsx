import React from 'react';
import { SingletonRouter } from 'next/router';

import { inject, observer } from 'mobx-react';
import { AuthStore } from '../services/auth';
import { CircularProgress } from '@material-ui/core';

interface AuthRouterProps {
  router: SingletonRouter;
  auth?: AuthStore;
}

@inject('auth')
@observer
class AuthRouter extends React.Component<AuthRouterProps> {
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
        console.log(this.props.router.route);
        console.log('Redirecting to login');
        if (this.props.router.route !== '/login') {
          this.props.router.replace('/login');
        }
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

export default AuthRouter;
