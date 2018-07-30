import { functions } from 'firestore-request';
import { Todo, TodoService } from './models/todo';

interface TodoUpdateRequest extends Todo {
  id: string;
}

const updateTodo = functions
  .request('updateTodo')
  .onRequest<TodoUpdateRequest>((params, context) => {
    return TodoService.updateTodo(params.data.payload);
  });

export { updateTodo };
