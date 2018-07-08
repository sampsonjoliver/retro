import * as React from 'react';
import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress
} from '@material-ui/core';
import Link from 'next/link';
import {
  FirestoreQueryComponent,
  FirestoreAutoObservable
} from 'react-firestore-mobx-bindings';
import { DrawerItem, UserDrawerItem } from './DrawerItem';

const styles: { [key: string]: React.CSSProperties } = {
  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  }
};

export const AppDrawerMenu = () => {
  const selector = (firestore: firebase.firestore.Firestore) => ({
    sprints: firestore.collection('sprints').orderBy('endDate')
  });

  return (
    <List style={styles.drawer}>
      <UserDrawerItem linkTo={{ pathname: '/user' }} text="You" />

      <FirestoreQueryComponent selector={selector}>
        {({ sprints }: { sprints: FirestoreAutoObservable<Sprint[]> }) => {
          if (sprints.data) {
            const currentSprint =
              sprints.data && sprints.data[sprints.data.length - 1];

            const listItems =
              sprints.data &&
              sprints.data.slice(0, sprints.data.length - 1).map(sprint => {
                return (
                  <DrawerItem
                    key={sprint.id}
                    text={sprint.name}
                    icon="calendar_view_day"
                    linkTo={{
                      pathname: '/sprint',
                      query: { id: currentSprint.id }
                    }}
                  />
                );
              });

            return (
              <>
                <DrawerItem
                  text={`Current: ${currentSprint.name}`}
                  icon="wb_sunny"
                  linkTo={{
                    pathname: '/sprint',
                    query: { id: currentSprint.id }
                  }}
                />
                <Divider />
                {listItems}
              </>
            );
          } else {
            return <CircularProgress />;
          }
        }}
      </FirestoreQueryComponent>
      <Divider style={{ flex: 1, backgroundColor: '#ffffff' }} />
      <Divider />
      <DrawerItem
        text="Settings"
        icon="settings"
        linkTo={{ pathname: '/setting' }}
      />
      <DrawerItem text="Help" icon="help" linkTo={{ pathname: '/about' }} />
    </List>
  );
};
