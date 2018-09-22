import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Avatar, Menu, MenuItem } from '@material-ui/core';
import { AuthStore, AuthState } from '../services/auth';

interface AvatarProps {
  auth?: AuthStore;
}

interface State {
  anchorEl: any;
}

@inject('auth')
@observer
class AuthStateAvatar extends React.Component<AvatarProps, State> {
  public state = {
    anchorEl: null
  };

  public setMenuAnchor = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: null });
  };

  public handleLogout = () => {
    this.handleClose();
    this.props.auth!.signOut();
  };

  public render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (this.props.auth!.authState === AuthState.signedIn) {
      const avatarWidget = this.props.auth!.user!.photoURL ? (
        <Avatar
          alt={this.props.auth!.user!.displayName || undefined}
          src={this.props.auth!.user!.photoURL || undefined}
          onClick={this.setMenuAnchor}
        />
      ) : (
        <Avatar onClick={this.setMenuAnchor}>
          {this.props.auth!.user!.displayName
            ? this.props.auth!.user!.displayName!.charAt(0)
            : '?'}
        </Avatar>
      );

      return (
        <>
          {avatarWidget}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl || undefined}
            getContentAnchorEl={undefined}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      );
    } else {
      return <Button color="inherit">Login</Button>;
    }
  }
}
export default AuthStateAvatar;
