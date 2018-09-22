import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';
import { action } from 'mobx';
import * as firebase from 'firebase';
import * as uuid from 'uuid/v4';

interface Request {
  requestType: string;
  status?: 'pending' | 'success' | 'failed';
  payload: object;
}

const request = (req: Request) =>
  firebase
    .firestore()
    .collection('requests')
    .doc('root')
    .collection(req.requestType)
    .add({
      ...req,
      status: req.status || 'pending'
    });

class FirestoreService extends FirestoreObservableFactory {
  private todos: firebase.firestore.CollectionReference;

  @action
  public rolloverSprint(sprint: Sprint) {
    return request({
      requestType: 'rolloverSprint',
      payload: sprint
    });
  }

  @action
  public createTodo(todo: Todo) {
    const todoWithId = {
      id: uuid(),
      ...todo
    };

    console.log('Creating todo', todoWithId);

    return this.todos.doc(todoWithId.id).set(todoWithId);
  }

  @action
  public updateTodo(todo: Todo) {
    this.ensureObjectId(todo);
    console.log('Updating todo', todo);
    return this.todos.doc(todo.id).update(todo);
  }

  @action
  public archiveTodo(todo: Todo) {
    this.ensureObjectId(todo);
    console.log('Archiving todo', todo);

    return this.todos.doc(todo.id).delete();
  }

  constructor(name: string) {
    super(name);
    this.todos = firebase.firestore().collection('todos');
  }

  private ensureObjectId(object: WithId) {
    if (!object.id) {
      throw new Error('Object missing id');
    }
  }
}

export { FirestoreService };
