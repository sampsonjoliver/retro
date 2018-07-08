import Link, { UrlLike } from 'next/link';
import {
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';

interface DrawerItemProps {
  text: string;
  linkTo: string | UrlLike;
  icon: string;
}

interface UserDrawerItemProps {
  text: string;
  linkTo: string | UrlLike;
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
  <Link href={props.linkTo}>
    <ListItem button>
      <ListItemIcon>
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>
);

export const UserDrawerItem = (props: UserDrawerItemProps) => (
  <Link href={props.linkTo}>
    <ListItem button>
      <ListItemAvatar>
        <Avatar style={styles.avatar} src={props.photoUrl} alt="Your photo" />
      </ListItemAvatar>
      <ListItemText primary={props.text} />
    </ListItem>
  </Link>
);
