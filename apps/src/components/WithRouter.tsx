import * as React from 'react';
import { withRouter, RouteComponentProps, match } from 'react-router';
import { History, Location } from 'history';

type Router = {
  history: History;
  location: Location;
  match: match;
};

type Props = RouteComponentProps & {
  children: (args: { router: Router }) => React.ReactNode;
};

const WithRouter = (props: Props) => {
  const router = {
    history: props.history,
    location: props.location,
    match: props.match
  };
  return props.children({ router });
};

const WithRouterWithRouter = withRouter(WithRouter as React.StatelessComponent<
  Required<Props>
>);

export { WithRouterWithRouter as WithRouter };
