import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';

interface Todo {
  id?: string;
  sprintId: string;
  title: string;
  status: 'complete' | 'incomplete' | 'archived';
}

const todos = admin.firestore().collection('todos');

const createTodo = (todo: Todo) => {
  const todoId = uuid();
  console.log(`Creating todo ${todoId}`);
  return todos.doc(todoId).create({
    id: todoId,
    ...todo
  });
};

const updateTodo = (todoId: string, todo: Partial<Todo>) => {
  console.log(`Updating todo ${todoId}`, todo);
  return todos.doc(todoId).update({
    ...todo
  });
};

const archiveTodo = (todoId: string) => {
  console.log(`Updating todo ${todoId}`);
  return todos.doc(todoId).delete();
};

const getOutstandingTodosForSprint = async (sprintId: string) => {
  console.log(`Getting outstanding todos for sprint ${sprintId}`);
  const sprintTodos = await todos
    .where('sprintId', '==', sprintId)
    .where('status', '==', 'incomplete')
    .get();
  return sprintTodos.docs.map(todo => todo.data() as Todo);
};

const TodoService = {
  createTodo,
  archiveTodo,
  updateTodo,
  getOutstandingTodosForSprint
};

export { Todo, TodoService };
