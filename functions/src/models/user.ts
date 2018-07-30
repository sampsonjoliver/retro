import * as admin from 'firebase-admin';

interface UserInfo {
  currentSprintId: string;
  backlogId: string;
  preferences?: object;
}

const createUserInfo = async (userId: string, userInfo: UserInfo) => {
  return await admin
    .firestore()
    .collection('users')
    .doc(userId)
    .create(userInfo);
};

export { createUserInfo };
