import * as React from 'react';
import { List, CircularProgress } from '@material-ui/core';
import {
  FirestoreQueryComponent,
  FirestoreAutoObservable
} from 'react-firestore-mobx-bindings';
import { TodoView } from '../components/Todo';
import { ListProps } from '@material-ui/core/List';

interface Props extends ListProps {
  sprintId?: string;
}

const SprintList = ({ sprintId, ...rest }: Props) => {
  const selector = (firestore: firebase.firestore.Firestore) => ({
    [`todos-${sprintId!}`]: firestore
      .collection('todos')
      .where('sprintId', '==', sprintId)
  });

  return (
    <List {...rest}>
      <FirestoreQueryComponent selector={selector}>
        {todosResult => {
          const todos: FirestoreAutoObservable<Todo[]> =
            todosResult[`todos-${sprintId!}`];
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
