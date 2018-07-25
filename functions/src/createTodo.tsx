import { functions } from 'firestore-request';
import { addTodoToSprint } from './models/todo';

interface TodoCreateRequest {
  title: string;
  status: 'complete' | 'incomplete';
  sprintId: string;
}

const createTodo = functions
  .request('createTodo')
  .onRequest<TodoCreateRequest>((params, context) => {
    const {
      payload: { sprintId, ...todo }
    } = params.data();

    return addTodoToSprint(sprintId, todo);
  });

export { createTodo };
