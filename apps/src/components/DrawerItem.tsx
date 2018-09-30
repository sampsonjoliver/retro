import * as React from 'react';
import {
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Location } from 'history';

interface DrawerItemProps {
  text: string;
  linkTo: string | Partial<Location>;
  icon: string;
}

interface SprintDrawerItemProps {
  sprint: Sprint;
  isCurrentSprint: boolean;
  linkTo: string | Partial<Location>;
}

interface UserDrawerItemProps {
  text: string;
  linkTo: string | Partial<Location>;
  photoUrl?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#18c'
  }
};

export const DrawerItem = (props: DrawerItemProps) => (
  <Link to={props.linkTo}>
    <ListItem button>
      <ListItemIcon>
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>
);

export const UserDrawerItem = (props: UserDrawerItemProps) => (
  <Link to={props.linkTo}>
    <ListItem button>
      <ListItemAvatar>
        <Avatar style={styles.avatar} src={props.photoUrl} alt="Your photo" />
      </ListItemAvatar>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>
);

export const SprintDrawerItem = (props: SprintDrawerItemProps) => (
  <Link to={props.linkTo}>
    <ListItem button>
      <ListItemIcon>
        <Icon>calendar_view_day</Icon>
      </ListItemIcon>
      <ListItemText primary={props.sprint.name} />
      {props.isCurrentSprint && (
        <ListItemSecondaryAction>
          <Tooltip id="tooltip" title="Click the things to rollover the sprint">
            <IconButton>
              <Icon>loop</Icon>
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  </Link>
);
