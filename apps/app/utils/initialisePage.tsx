import React, { Component } from 'react';
import { Context } from 'next/Document';

import { Provider as MobxProvider } from 'mobx-react';
import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';

import { initStore, AuthStore } from '../services/auth';
import { initializeApp } from '../services/firebase';
import { withRoot } from './withRoot';

interface PageProps extends Context {
  isServer: boolean;
}
function initializePage(Page: React.ComponentClass<any>) {
  class PageComponent extends Component<PageProps> {
    private authService?: AuthStore;

    public static getInitialProps(context: Context) {
      const isServer = !!context.req;
      return { isServer };
    }

    constructor(props: PageProps) {
      super(props);
      initializeApp();
      this.authService = initStore();
    }

    public render() {
      const observableFactory = new FirestoreObservableFactory(
        'FirestoreObservableFactory'
      );

      const { isServer, ...props } = this.props;

      return (
        <MobxProvider
          AutoObservableFactory={observableFactory}
          auth={this.authService}
        >
          <Page {...props} />
        </MobxProvider>
      );
    }
  }

  return PageComponent;
}

export { initializePage };
