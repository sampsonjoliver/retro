import * as React from "react";

import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import {
  Icon,
  Typography,
  IconButton,
  AppBar,
  Toolbar
} from "@material-ui/core";

import { withRoot } from "../utils/withRoot";
import { AppDrawer } from "./Drawer";
import { AppDrawerMenu } from "./AppDrawerMenu";
import { drawerWidth } from "../consts";

import { WithAuth } from "./WithAuth";
import AuthStateAvatar from "./Avatar";

const styles = theme =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "calc(100%)",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    appBar: {
      position: "absolute",
      marginLeft: drawerWidth,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    flex: {
      flex: 1
    },
    menuButton: {
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up("md")]: {
        position: "relative",
        height: "100vh"
      }
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      display: "flex",
      flexDirection: "column"
    }
  });

interface State {
  mobileOpen: boolean;
}

interface Props extends WithStyles<typeof styles> {
  title: string;
}

class AppComponent extends React.Component<Props, State> {
  public state = {
    mobileOpen: false
  };

  public handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  public render() {
    const { classes } = this.props;

    return (
      <main>
        <div className={classes.root}>
          <WithAuth>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  noWrap
                  className={classes.flex}
                >
                  {this.props.title}
                </Typography>
                <AuthStateAvatar />
              </Toolbar>
            </AppBar>
            <AppDrawer
              mobileOpen={this.state.mobileOpen}
              onClose={() => this.setState({ mobileOpen: false })}
            >
              <AppDrawerMenu />
            </AppDrawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {this.props.children}
            </main>
          </WithAuth>
        </div>
      </main>
    );
  }
}

const StyledApp = withStyles(styles)(AppComponent);
const App = withRoot(StyledApp);
export { App };
