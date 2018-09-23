import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';
import * as addWeeks from 'date-fns/add_weeks';
import { UserService } from './user';
import { TodoService } from './todo';

interface Sprint {
  id: string;
  startDate: admin.firestore.Timestamp;
  endDate: admin.firestore.Timestamp;
  name: string;
  userId: string;
}

const sprints = admin.firestore().collection('sprints');

const getSprintsForUser = async (userId: string) => {
  console.log(`Getting all sprints for ${userId}`);
  const userSprints = await sprints.where('userId', '==', userId).get();
  return userSprints.docs.map(doc => doc.data() as Sprint);
};

const createNewSprintForUser = async (userId: string, sprintNumber: number) => {
  const sprintId = uuid();
  console.log(`Creating new sprint ${sprintId} for user ${userId}`);

  const sprint: Sprint = {
    id: sprintId,
    startDate: admin.firestore.Timestamp.now(),
    endDate: admin.firestore.Timestamp.fromDate(addWeeks(Date.now(), 2)),
    name: `Sprint ${sprintNumber}`,
    userId: userId
  };

  await sprints.doc(sprintId).create(sprint);

  return sprint;
};

const createBacklogForUser = async (userId: string) => {
  const backlogId = uuid();
  console.log(`Creating backlog ${backlogId} for user ${userId}`);

  const sprint: Sprint = {
    id: backlogId,
    startDate: admin.firestore.Timestamp.now(),
    endDate: admin.firestore.Timestamp.fromDate(addWeeks(Date.now(), 2)),
    name: 'Backlog',
    userId: userId
  };

  await sprints.doc(backlogId).create(sprint);

  return sprint;
};

const rolloverSprintForUser = async (userId: string) => {
  const userInfo = await UserService.getUserInfo(userId);

  const outstandingTodos = await TodoService.getOutstandingTodosForSprint(
    userInfo.currentSprintId
  );

  const userSprints = await getSprintsForUser(userId);

  const newSprint = await createNewSprintForUser(userId, userSprints.length);

  const outstandingUserUpdates = outstandingTodos.map(todo => {
    return TodoService.updateTodo(todo.id, {
      sprintId: newSprint.id
    });
  });

  const userUpdate = UserService.updateUserInfo(userId, {
    currentSprintId: newSprint.id
  });

  return Promise.all([userUpdate, ...outstandingUserUpdates]);
};

const SprintService = {
  createNewSprintForUser,
  createBacklogForUser,
  rolloverSprintForUser
};

export { Sprint, SprintService };
