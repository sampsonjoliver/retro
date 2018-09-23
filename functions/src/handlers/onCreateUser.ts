import * as functions from 'firebase-functions';
import { SprintService } from '../models/sprint';
import { UserService } from '../models/user';

const onCreateUser = functions.auth.user().onCreate(async (user, context) => {
  console.log('Setting up user', user);
  const [backlog, currentSprint] = await Promise.all([
    SprintService.createBacklogForUser(user.uid),
    SprintService.createNewSprintForUser(user.uid, 1)
  ]);

  console.log('Creating user ', user);
  return await UserService.createUserInfo(user.uid, {
    backlogId: backlog.id,
    currentSprintId: currentSprint.id
  });
});

export { onCreateUser };
