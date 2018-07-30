import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';
import * as addWeeks from 'date-fns/add_weeks';

const createNewSprintForUser = async (userId: string, sprintNumber: number) => {
  const currentSprintId = uuid();
  await admin
    .firestore()
    .collection('sprints')
    .doc(currentSprintId)
    .create({
      id: currentSprintId,
      startDate: Date.now(),
      endDate: addWeeks(Date.now(), 2),
      name: `Sprint ${sprintNumber}`,
      userId: userId
    });

  return currentSprintId;
};

const createBacklogForUser = async (userId: string) => {
  const backlogSprintId = uuid();
  await admin
    .firestore()
    .collection('sprints')
    .doc(backlogSprintId)
    .create({
      id: backlogSprintId,
      startDate: Date.now(),
      endDate: Date.now(),
      name: 'Backlog',
      userId: userId
    });

  return backlogSprintId;
};

export { createNewSprintForUser, createBacklogForUser };
