import * as React from 'react';
import { Divider, List, CircularProgress } from '@material-ui/core';
import { useCollection } from 'react-firebase-hooks/firestore';

import { DrawerItem, UserDrawerItem, SprintDrawerItem } from './DrawerItem';
import { useAuth } from 'src/utils/useAuthHook';
import { firestore, auth } from 'firebase';

const styles: { [key: string]: React.CSSProperties } = {
  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff'
  }
};

const AppDrawerMenuList = (props: {
  uid: string;
  currentSprintId: string;
  backlogId: string;
}) => {
  const { value } = useCollection(
    firestore()
      .collection('sprints')
      .where('userId', '==', props.uid)
      .orderBy('endDate', 'desc')
  );

  if (value) {
    const sprints = value.docs.map(doc => doc.data() as Sprint);
    const currentSprint = sprints.find(
      sprint => sprint.id === props.currentSprintId
    );
    const backlog = sprints.find(sprint => sprint.id === props.backlogId);
    const otherSprints = sprints.filter(
      sprint => sprint.id !== props.backlogId
    );

    const listItems = otherSprints.map(sprint => {
      return (
        <SprintDrawerItem
          key={sprint.id}
          sprint={sprint}
          isCurrentSprint={sprint.id === props.currentSprintId}
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
  }

  return <CircularProgress />;
};

const AppDrawerMenu = () => {
  const { user } = useAuth(auth(), firestore());

  return (
    <List style={styles.drawer}>
      <UserDrawerItem linkTo={{ pathname: '/user' }} text="You" />
      {user ? (
        <AppDrawerMenuList
          uid={user.uid}
          backlogId={user.backlogId}
          currentSprintId={user.currentSprintId}
        />
      ) : (
        <CircularProgress />
      )}
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

export { AppDrawerMenu };
