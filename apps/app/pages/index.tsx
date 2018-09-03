import React from 'react';
import { Context } from 'next/document';
import { withRouter, SingletonRouter } from 'next/router';

import { initializePage } from '../utils/initialisePage';
import AuthRouter from '../components/AuthRouter';

interface PageProps extends Context {
  isServer: boolean;
  router: SingletonRouter;
}

class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    return <AuthRouter router={this.props.router} />;
  }
}

const IndexWithRouter = withRouter(Index);
export default initializePage(IndexWithRouter);
