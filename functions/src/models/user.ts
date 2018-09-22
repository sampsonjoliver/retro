import * as admin from 'firebase-admin';

interface UserInfo {
  currentSprintId: string;
  backlogId: string;
  preferences?: object;
}

const users = admin.firestore().collection('users');

const getUserInfo = async (userId: string) => {
  console.log(`Getting user ${userId}`);
  const userInfo = await users.doc(userId).get();
  return userInfo.data() as UserInfo;
};

const createUserInfo = async (userId: string, userInfo: UserInfo) => {
  console.log(`Creating user ${userId}`, userInfo);
  return await users.doc(userId).create(userInfo);
};

const updateUserInfo = async (userId: string, userInfo: Partial<UserInfo>) => {
  console.log(`Updating user ${userId}`, userInfo);
  return await users.doc(userId).update(userInfo);
};

const UserService = {
  getUserInfo,
  createUserInfo,
  updateUserInfo
};

export { UserInfo, UserService };
