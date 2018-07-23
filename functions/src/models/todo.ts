import * as admin from 'firebase-admin';

interface Todo {
  title: string;
  status: 'complete' | 'incomplete';
}

const sprintTodos = (sprintId: string) =>
  admin
    .firestore()
    .collection('sprints')
    .doc(sprintId)
    .collection('todos');

const addTodoToSprint = (sprintId: string, todo: Todo) => {
  return sprintTodos(sprintId).add(todo);
};

export { addTodoToSprint };
