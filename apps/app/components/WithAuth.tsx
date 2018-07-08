import { observer, inject } from 'mobx-react';
import { AuthStore } from 'services/auth';
import { ListItem, Button } from '@material-ui/core';
import { ReactNode } from 'react';

interface Props {
  auth?: AuthStore;
  children?: ReactNode;
}

interface InjecedProps {
  auth: AuthStore;
}

const WithAuthComponent: React.StatelessComponent<Props> = (props: Props) => {
  const injected = props as InjecedProps;
  if (injected.auth.user && injected.auth.userInfo && props.children) {
    return <>{props.children}</>;
  } else {
    return (
      <>
        <p>Ya gotta login m9</p>
        <Button onClick={() => injected.auth.signInWithGoogle()}>
          Login with Googs
        </Button>
      </>
    );
  }
};

export const WithAuth = inject('auth')(observer(WithAuthComponent));
