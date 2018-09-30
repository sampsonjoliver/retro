import * as React from 'react';
import { Divider, List, CircularProgress } from '@material-ui/core';

import {
  FirestoreQueryComponent,
  FirestoreAutoObservable
} from 'react-firestore-mobx-bindings';
import { DrawerItem, UserDrawerItem, SprintDrawerItem } from './DrawerItem';
import { WithAuth } from './WithAuth';

const styles: { [key: string]: React.CSSProperties } = {
  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  }
};

const AppDrawerMenu = () => {
  return (
    <WithAuth>
      {({ user }) => {
        const { uid, currentSprintId, backlogId } = user;

        const selector = (firestore: firebase.firestore.Firestore) => ({
          sprints: firestore
            .collection('sprints')
            .where('userId', '==', uid)
            .orderBy('endDate', 'desc')
        });

        return (
          <List style={styles.drawer}>
            <UserDrawerItem linkTo={{ pathname: '/user' }} text="You" />

            <FirestoreQueryComponent selector={selector}>
              {({
                sprints
              }: {
                sprints: FirestoreAutoObservable<Sprint[]>;
              }) => {
                if (sprints.data) {
                  const currentSprint = sprints.data.find(
                    sprint => sprint.id === currentSprintId
                  );
                  const backlog = sprints.data.find(
                    sprint => sprint.id === backlogId
                  );
                  const otherSprints = sprints.data.filter(
                    sprint => sprint.id !== backlogId
                  );

                  const listItems = otherSprints.map(sprint => {
                    return (
                      <SprintDrawerItem
                        key={sprint.id}
                        sprint={sprint}
                        isCurrentSprint={sprint.id === currentSprintId}
                        linkTo={{
                          pathname: '/sprint',
                          search: `?id=${sprint.id}`
                        }}
                      />
                    );
                  });

                  const currentSprintComponent = currentSprint && (
                    <DrawerItem
                      text={`Current: ${currentSprint.name}`}
                      icon="wb_sunny"
                      linkTo={{
                        pathname: '/sprint',
                        search: `?id=${currentSprint.id}`
                      }}
                    />
                  );

                  const backlogComponent = backlog && (
                    <DrawerItem
                      text={backlog.name}
                      icon="list_alt"
                      linkTo={{
                        pathname: '/sprint',
                        search: `?id=${backlog.id}`
                      }}
                    />
                  );

                  return (
                    <>
                      {currentSprintComponent}
                      {backlogComponent}
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
            <DrawerItem
              text="Help"
              icon="help"
              linkTo={{ pathname: '/about' }}
            />
          </List>
        );
      }}
    </WithAuth>
  );
};

export { AppDrawerMenu };
