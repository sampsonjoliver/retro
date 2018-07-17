import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';
import { action } from 'mobx';
import { initialiseApp } from '../firebase-requests/app';
import { request } from '../firebase-requests/request';

initialiseApp({
  rootCollection: 'requests'
});

class FirestoreService extends FirestoreObservableFactory {
  @action
  public createSprint(sprint: Sprint) {
    return request({
      requestType: 'createSprint',
      payload: sprint
    });
  }

  @action
  public createTodo(todo: Todo) {
    return request({
      requestType: 'createTodo',
      payload: todo
    });
  }

  constructor(name: string) {
    super(name);
  }
}

export { FirestoreService };
