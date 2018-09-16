type SprintId = string | 'backlog';

interface Sprint extends WithId {
  userId: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface UserInfo {
  currentSprintId: string;
  backlogId: string;
  preferences: object;
}

type RetroUser = Partial<
  firebase.User & {
    currentSprintId: string;
    backlogId: string;
    preferences: object;
  }
>;

interface Todo extends WithId {
  sprintId: SprintId;
  userId: string;
  title: string;
  status: 'complete' | 'incomplete';
}

interface WithId {
  id?: string;
}
