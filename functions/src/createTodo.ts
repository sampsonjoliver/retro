import { functions } from 'firestore-request';
import { Todo, TodoService } from './models/todo';

const createTodo = functions
  .request('createTodo')
  .onRequest<Todo>((params, context) => {
    return TodoService.createTodo(params.data.payload);
  });

export { createTodo };
