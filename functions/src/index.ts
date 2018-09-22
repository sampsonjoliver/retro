import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

import { onCreateUser } from './handlers/onCreateUser';

import { rolloverSprint } from './handlers/rolloverSprint';

const healthcheck = functions.https.onRequest((request, response) => {
  response.send('Healthy =)');
});

export const backend = {
  healthcheck,
  onCreateUser,
  rolloverSprint
};
