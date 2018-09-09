import React from 'react';
import { Context } from 'next/document';
import { initializePage } from '../utils/initialisePage';
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  Dialog,
  CircularProgress,
  DialogTitle
} from '@material-ui/core';
import { AuthState } from '../services/auth';
import { withRoot } from '../utils/withRoot';
import { WithAuth } from '../components/WithAuth';
import { WithRouter } from '../components/WithRouter';

interface PageProps extends Context {
  isServer: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing.unit * 2
    },
    loginButton: {
      margin: theme.spacing.unit,
      width: theme.spacing.unit * 30,
      height: theme.spacing.unit * 6
    },
    loginIcon: {
      width: '24px',
      marginRight: theme.spacing.unit
    },
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    appBar: {
      position: 'absolute'
    },
    flex: {
      flex: 1
    },
    toolbar: theme.mixins.toolbar,
    content: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    anonText: {
      width: theme.spacing.unit * 50,
      textAlign: 'center',
      margin: theme.spacing.unit * 2
    }
  });

class LoginPage extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    return (
      <WithAuth>
        {({ authState, user, authService }) => (
          <WithRouter>
            {({ router }) => {
              if (authState === AuthState.signedIn) {
                router.replace({
                  pathname: '/sprint',
                  query: { id: user.currentSprintId }
                });
              }

              return (
                <>
                  <StyledAuthPage
                    signInAnonymously={() => authService.signInAnonymously()}
                    signInWithFacebook={() => authService.signInWithFacebook()}
                    signInWithGoogle={() => authService.signInWithGoogle()}
                  />
                  <Dialog
                    open={
                      authState === AuthState.resolving ||
                      authState === AuthState.loading
                    }
                  >
                    <DialogTitle>Loading</DialogTitle>
                    <div>
                      <CircularProgress />
                    </div>
                  </Dialog>
                </>
              );
            }}
          </WithRouter>
        )}
      </WithAuth>
    );
  }
}

type AuthPageProps = Partial<WithStyles<typeof styles>> & {
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  signInAnonymously: () => void;
};

const AuthPage = (props: AuthPageProps) => {
  const classes = props.classes!;
  return (
    <main className={classes.root}>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Retro
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Typography className={classes.title} variant="headline">
            Login
          </Typography>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            onClick={() => props.signInWithGoogle()}
          >
            <img src="/static/google.png" className={classes.loginIcon} />
            Sign in with Google
          </Button>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            onClick={() => props.signInWithFacebook()}
          >
            <img src="/static/facebook.png" className={classes.loginIcon} />
            Sign in with Facebook
          </Button>
          <Typography className={classes.title} variant="subheading">
            or
          </Typography>
          <Button
            className={classes.loginButton}
            variant="outlined"
            size="large"
            onClick={() => props.signInAnonymously()}
          >
            Just Get Started*
          </Button>
          <Typography variant="caption" className={classes.anonText}>
            * Anonymous accounts cannot sync data cross-device, and may lose
            data when the browser clears site cookies. You can upgrade your
            account at any time.
          </Typography>
        </div>
      </div>
    </main>
  );
};

const StyledAuthPage = withStyles(styles)(AuthPage);

export default initializePage(withRoot(LoginPage));
