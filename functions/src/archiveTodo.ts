import { functions } from 'firestore-request';
import { Todo, TodoService } from './models/todo';

interface TodoArchiveRequest extends Todo {
  id: string;
}

const archiveTodo = functions
  .request('archiveTodo')
  .onRequest<TodoArchiveRequest>((params, context) => {
    return TodoService.archiveTodo(params.data.payload);
  });

export { archiveTodo };
