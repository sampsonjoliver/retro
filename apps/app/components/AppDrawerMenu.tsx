import * as React from 'react';
import {
  Divider,
  Avatar,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import Link from 'next/link';

const styles: { [key: string]: React.CSSProperties } = {
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#18c'
  },
  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  }
};

export const AppDrawerMenu = () => {
  return (
    <List style={styles.drawer}>
      <Link href={{ pathname: '/user' }}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar style={styles.avatar} alt="Your photo" />
          </ListItemAvatar>
          <ListItemText primary="You" />
        </ListItem>
      </Link>
      <Link href={{ pathname: '/' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon>wb_sunny</Icon>
          </ListItemIcon>
          <ListItemText primary="Current Sprint" />
        </ListItem>
      </Link>
      <Divider />
      <Link href={{ pathname: '/sprint', query: { id: 'current' } }}>
        <ListItem button>
          <ListItemIcon>
            <Icon>calendar_view_day</Icon>
          </ListItemIcon>
          <ListItemText primary="Sprint 1" />
        </ListItem>
      </Link>
      <ListItem button>
        <ListItemIcon>
          <Icon>calendar_view_day</Icon>
        </ListItemIcon>
        <ListItemText primary="Sprint 1" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Icon>add</Icon>
        </ListItemIcon>
        <ListItemText primary="Rollover Sprint" />
      </ListItem>
      <Divider style={{ flex: 1, backgroundColor: '#ffffff' }} />
      <Divider />
      <Link href={{ pathname: '/settings' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </Link>
      <Link href={{ pathname: '/about' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon>help</Icon>
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </Link>
    </List>
  );
};
