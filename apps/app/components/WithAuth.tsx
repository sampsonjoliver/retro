import { observer, inject } from 'mobx-react';
import React, { ReactNode } from 'react';

import { AuthStore } from '../services/auth';
import { withRouter, SingletonRouter } from 'next/router';

interface Props {
  auth?: AuthStore;
  children?: ReactNode;
  router?: SingletonRouter;
}

interface InjectedProps {
  auth: AuthStore;
}

@inject('auth')
@observer
class WithAuth extends React.Component<Required<Props>> {
  public render() {
    const injected = this.props as InjectedProps;
    if (injected.auth.user && injected.auth.userInfo && this.props.children) {
      return <>{this.props.children}</>;
    } else {
      this.props.router!.push('/');
      return (
        <>
          <p>Ya gotta login m9</p>
        </>
      );
    }
  }
}

const WithAuthWithRouter = withRouter(WithAuth) as React.ComponentClass<Props>;
export { WithAuthWithRouter as WithAuth };
