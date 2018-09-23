import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';
import { action } from 'mobx';
import * as firebase from 'firebase';
import * as uuid from 'uuid/v4';
import { request, Request } from '../utils/request';

class FirestoreService extends FirestoreObservableFactory {
  private todos: firebase.firestore.CollectionReference;

  public makeRequest(requestData: Request) {
    return request(requestData);
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
