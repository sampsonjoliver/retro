import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { createTodo } from './createTodo';
import { updateTodo } from './updateTodo';
import { archiveTodo } from './archiveTodo';

import { onCreateUser } from './onCreateUser';

admin.initializeApp();

const healthcheck = functions.https.onRequest((request, response) => {
  response.send('Healthy =)');
});

export const backend = {
  healthcheck,
  createTodo,
  updateTodo,
  archiveTodo,
  onCreateUser
};
