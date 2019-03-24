import { useContext } from 'react';
import * as React from 'react';
import {
  RouteProps,
  Redirect,
  Route as ReactRoute,
  StaticContext,
  RouteComponentProps
} from 'react-router';
import * as H from 'history';

import { AuthContext } from '../context/auth';

// @ts-ignore
import { __RouterContext as RouterContext } from 'react-router';

export function useRouter<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
>() {
  return useContext(RouterContext) as RouteComponentProps<Params, C, S>;
}

type Props = RouteProps & { requireAuth?: boolean };

export const Route: React.StatelessComponent<Props> = props => {
  const userData = useContext(AuthContext);
  const { location } = useRouter();

  if (userData.isLoading) {
    return null;
  } else if (
    !userData.user &&
    props.requireAuth &&
    location.pathname !== '/login'
  ) {
    return <Redirect to="/login" />;
  } else {
    return <ReactRoute {...props} />;
  }
};
