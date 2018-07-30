import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';

interface Todo {
  id?: string;
  sprintId: string;
  title: string;
  status: 'complete' | 'incomplete' | 'archived';
}

const todos = () => admin.firestore().collection('todos');

const createTodo = (todo: Todo) => {
  const id = uuid();
  return todos()
    .doc(id)
    .create({
      id: id,
      ...todo
    });
};

const updateTodo = (todo: Todo) => {
  return todos()
    .doc(todo.id)
    .update({
      ...todo
    });
};

const archiveTodo = (todo: Todo) => {
  return todos()
    .doc(todo.id)
    .delete();
};

const TodoService = {
  createTodo,
  archiveTodo,
  updateTodo
};

export { Todo, TodoService };
