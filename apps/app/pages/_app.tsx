import App, { Container } from 'next/app';
import React from 'react';
import { useStaticRendering } from 'mobx-react';
import DocumentComponent, { Context } from 'next/Document';
import { SingletonRouter } from 'next/Router';

interface AppProps {
  ctx: Context;
  router: SingletonRouter;
  Component: typeof DocumentComponent;
}

export default class MyApp extends App {
  public props: any;

  public static async getInitialProps({ Component, router, ctx }: AppProps) {
    let pageProps = {};

    console.info(`Set SSR static rendering ${!!ctx.req}`);
    useStaticRendering(!!ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}
