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
  Theme
} from '@material-ui/core';
import { inject } from 'mobx-react';
import { AuthStore } from '../services/auth';
import { withRoot } from '../utils/withRoot';
import AuthRouter from '../components/AuthRouter';
import { SingletonRouter, withRouter } from 'next/router';

interface PageProps extends Context, WithStyles<typeof styles> {
  isServer: boolean;
  auth: AuthStore;
  router: SingletonRouter;
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
    }
  });

@inject('auth')
class Index extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
        <div className={classes.root}>
          <AuthRouter router={this.props.router} />
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Retro
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Typography className={this.props.classes.title} variant="headline">
              Login
            </Typography>
            <Button
              className={this.props.classes.loginButton}
              variant="contained"
              color="primary"
              onClick={() => this.props.auth.signInWithGoogle()}
            >
              <img
                src="/static/google.png"
                className={this.props.classes.loginIcon}
              />
              Sign in with Google
            </Button>
            <Button
              className={this.props.classes.loginButton}
              variant="contained"
              color="primary"
              onClick={() => this.props.auth.signInWithFacebook()}
            >
              <img
                src="/static/facebook.png"
                className={this.props.classes.loginIcon}
              />
              Sign in with Facebook
            </Button>
            <Typography
              className={this.props.classes.title}
              variant="subheading"
            >
              or
            </Typography>
            <Button
              className={this.props.classes.loginButton}
              variant="outlined"
              size="large"
              onClick={() => this.props.auth.signInAnonymously()}
            >
              Just Get Started
            </Button>
          </div>
        </div>
      </main>
    );
  }
}

const StyledIndex = withStyles(styles)(Index);
const StyledIndexWithRootAndRouter = withRoot(withRouter(StyledIndex));

export default initializePage(StyledIndexWithRootAndRouter);
