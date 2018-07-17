interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
}

interface UserInfo {
  currentSprintId: string;
  preferences: object;
}

interface Todo {
  title: string;
  status: 'complete' | 'incomplete';
}
