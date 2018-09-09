import * as functions from 'firebase-functions';
import { createBacklogForUser, createNewSprintForUser } from './models/sprint';
import { createUserInfo } from './models/user';

const onCreateUser = functions.auth.user().onCreate(async (user, context) => {
  console.log('Setting up user', user);
  const [backlogId, currentSprintId] = await Promise.all([
    createBacklogForUser(user.uid),
    createNewSprintForUser(user.uid, 1)
  ]);

  console.log('Creating user ', user);
  return await createUserInfo(user.uid, {
    backlogId,
    currentSprintId
  });
});

export { onCreateUser };
