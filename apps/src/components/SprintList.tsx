import * as React from 'react';
import { List, CircularProgress } from '@material-ui/core';
import {
  FirestoreQueryComponent,
  FirestoreAutoObservable
} from 'react-firestore-mobx-bindings';
import { TodoView } from '../components/Todo';

interface Props {
  sprintId?: string;
}

const SprintList = (props: Props) => {
  const selector = (firestore: firebase.firestore.Firestore) => ({
    [`todos-${props.sprintId!}`]: firestore
      .collection('todos')
      .where('sprintId', '==', props.sprintId)
  });

  return (
    <List
      style={{
        flexGrow: 1,
        overflowY: 'auto'
      }}
    >
      <FirestoreQueryComponent selector={selector}>
        {todosResult => {
          const todos: FirestoreAutoObservable<Todo[]> =
            todosResult[`todos-${props.sprintId!}`];
          if (todos.data) {
            return (
              <>
                {todos.data.map(todo => (
                  <div key={todo.id || ''}>
                    <TodoView todo={todo} isAddedToMyDay isCurrentSprint />
                  </div>
                ))}
              </>
            );
          } else {
            return <CircularProgress />;
          }
        }}
      </FirestoreQueryComponent>
    </List>
  );
};

export { SprintList };
