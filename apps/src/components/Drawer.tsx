import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Hidden, Drawer } from '@material-ui/core';
import { drawerWidth } from '../consts';

const styles = theme =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        height: '100vh'
      }
    }
  });

interface Props extends WithStyles<typeof styles> {
  onClose: () => void;
  mobileOpen: boolean;
}

class AppDrawerComponent extends React.Component<Props, {}> {
  public render() {
    const { classes, theme } = this.props;

    return (
      <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme!.direction === 'rtl' ? 'right' : 'left'}
            open={this.props.mobileOpen}
            onClose={this.props.onClose}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={
              { keepMounted: true } // Better open performance on mobile.
            }
          >
            {this.props.children}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            {this.props.children}
          </Drawer>
        </Hidden>{' '}
      </>
    );
  }
}

export const AppDrawer = withStyles(styles, { withTheme: true })(
  AppDrawerComponent
);
