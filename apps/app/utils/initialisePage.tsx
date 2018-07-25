import React, { Component } from "react";
import { Context } from "next/document";
import { Provider as MobxProvider } from "mobx-react";

import { FirestoreService } from "../services/firestore";
import { initStore, AuthStore } from "../services/auth";
import { initializeApp } from "../services/firebase";

interface PageProps extends Context {
  isServer: boolean;
}
function initializePage(
  Page: React.ComponentClass<any> | React.ComponentType<any>
) {
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
      const firestoreService = new FirestoreService("FirestoreService");

      const { isServer, ...props } = this.props;

      return (
        <MobxProvider
          AutoObservableFactory={firestoreService}
          FirestoreService={firestoreService}
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
