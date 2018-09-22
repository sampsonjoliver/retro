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
    todos: firestore.collection('todos').where('sprintId', '==', props.sprintId)
  });

  return (
    <List>
      <FirestoreQueryComponent selector={selector}>
        {({ todos }: { todos: FirestoreAutoObservable<Todo[]> }) => {
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
