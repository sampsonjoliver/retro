import { observer, inject, Observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { autorun } from 'mobx';

import { AuthStore } from '../services/auth';
import { withRouter, SingletonRouter } from 'next/router';

interface Props {
  auth?: AuthStore;
  children?: ReactNode;
  router: SingletonRouter;
}

interface InjectedProps {
  auth: AuthStore;
}

@inject('auth')
@observer
class WithAuth extends React.Component<Props> {
  public render() {
    const injected = this.props as InjectedProps;
    if (injected.auth.user && injected.auth.userInfo && this.props.children) {
      return <>{this.props.children}</>;
    } else {
      this.props.router.push('/');
      return (
        <>
          <p>Ya gotta login m9</p>
          <Button onClick={() => injected.auth.signInWithGoogle()}>
            Login with Googs
          </Button>
        </>
      );
    }
  }
}

const WithAuthWithRouter = withRouter(WithAuth);
export { WithAuthWithRouter as WithAuth };
