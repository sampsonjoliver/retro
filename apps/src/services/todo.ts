import { action } from 'mobx';
import { firestore } from 'firebase';
import * as uuid from 'uuid';

class TodoService {
  private todos: firebase.firestore.CollectionReference;

  public static makeStoreName(todoId: string) {
    return `todo-${todoId}`;
  }

  constructor() {
    this.todos = firestore().collection('todos');
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

  private ensureObjectId(object: WithId) {
    if (!object.id) {
      throw new Error('Object missing id');
    }
  }
}

export { TodoService };
