import * as React from "react";
import { Divider, List, CircularProgress } from "@material-ui/core";
import { inject, observer } from "mobx-react";

import {
  FirestoreQueryComponent,
  FirestoreAutoObservable
} from "react-firestore-mobx-bindings";
import { DrawerItem, UserDrawerItem } from "./DrawerItem";
import { AuthStore } from "../services/auth";

const styles: { [key: string]: React.CSSProperties } = {
  drawer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#fff"
  }
};

interface Props {
  auth?: AuthStore;
}

const AppDrawerMenuComponent = (props: Props) => {
  const selector = (firestore: firebase.firestore.Firestore) => ({
    sprints: firestore
      .collection("sprints")
      .where("userId", "==", props.auth!.userId)
      .orderBy("endDate", "desc")
  });

  const currentSprintId = props.auth!.userInfo!.currentSprintId;
  const backlogId = props.auth!.userInfo!.backlogId;

  return (
    <List style={styles.drawer}>
      <UserDrawerItem linkTo={{ pathname: "/user" }} text="You" />

      <FirestoreQueryComponent selector={selector}>
        {({ sprints }: { sprints: FirestoreAutoObservable<Sprint[]> }) => {
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
                <DrawerItem
                  key={sprint.id}
                  text={sprint.name}
                  icon="calendar_view_day"
                  linkTo={{ pathname: "/sprint", query: { id: sprint.id } }}
                />
              );
            });

            const currentSprintComponent = currentSprint && (
              <DrawerItem
                text={`Current: ${currentSprint.name}`}
                icon="wb_sunny"
                linkTo={{
                  pathname: "/sprint",
                  query: { id: currentSprint.id }
                }}
              />
            );

            const backlogComponent = backlog && (
              <DrawerItem
                text={backlog.name}
                icon="list_alt"
                linkTo={{ pathname: "/sprint", query: { id: backlog.id } }}
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
      <Divider style={{ flex: 1, backgroundColor: "#ffffff" }} />
      <Divider />
      <DrawerItem
        text="Settings"
        icon="settings"
        linkTo={{ pathname: "/setting" }}
      />
      <DrawerItem text="Help" icon="help" linkTo={{ pathname: "/about" }} />
    </List>
  );
};

const AppDrawerMenu = inject("auth")(observer(AppDrawerMenuComponent));

export { AppDrawerMenu };
