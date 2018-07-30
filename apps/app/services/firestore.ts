import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';
import { action } from 'mobx';
import { firestore } from 'firebase';

interface Request {
  requestType: string;
  status?: 'pending' | 'success' | 'failed';
  payload: object;
}

const request = (req: Request) =>
  firestore()
    .collection('requests')
    .doc('root')
    .collection(req.requestType)
    .add({
      ...req,
      status: req.status || 'pending'
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
    console.log('Creating todo', todo);
    return request({
      requestType: 'createTodo',
      payload: {
        ...todo
      }
    });
  }

  @action
  public updateTodo(todo: Todo) {
    this.ensureObjectId(todo);
    console.log('Updating todo', todo);
    return request({
      requestType: 'updateTodo',
      payload: todo
    });
  }

  @action
  public archiveTodo(todo: Todo) {
    this.ensureObjectId(todo);
    console.log('Archiving todo', todo);

    return request({
      requestType: 'archiveTodo',
      payload: todo
    });
  }

  constructor(name: string) {
    super(name);
  }

  private ensureObjectId(object: WithId) {
    if (!object.id) {
      throw new Error('Object missing id');
    }
  }
}

export { FirestoreService };
