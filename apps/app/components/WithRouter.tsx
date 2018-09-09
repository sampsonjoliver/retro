import React, { ReactNode } from 'react';
import { SingletonRouter, withRouter } from 'next/router';

type Props = {
  router?: SingletonRouter;
  children: (args: { router: SingletonRouter }) => ReactNode;
};

const WithRouter = (props: Props) => {
  return props.children({ router: props.router! });
};

const WithRouterWithRouter = withRouter(WithRouter as React.StatelessComponent<
  Required<Props>
>);
export { WithRouterWithRouter as WithRouter };
