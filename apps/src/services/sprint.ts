import { FirestoreService } from './firestore';
import { action, autorun, observable } from 'mobx';
import { AuthService } from './auth';
import * as isPast from 'date-fns/is_past';
import { firestore } from 'firebase';

class SprintService {
  @observable public isCurrentSprintEnded: boolean = false;

  private firestoreService: FirestoreService;
  private authService: AuthService;

  constructor(firestoreService: FirestoreService, authService: AuthService) {
    this.firestoreService = firestoreService;
    this.authService = authService;

    this.watchSprint();
  }

  public watchSprint() {
    autorun(async () => {
      const currentSprintId = this.authService.user.currentSprintId;
      if (currentSprintId) {
        const sprint = await firestore()
          .collection('sprints')
          .doc(currentSprintId)
          .get();

        const currentSprint = sprint.data() as Sprint;
        console.log('Examining current sprint end date', currentSprint);

        this.isCurrentSprintEnded = isPast(currentSprint.endDate.toDate());
      }
    });
  }

  @action
  public rolloverSprint() {
    const userId = this.authService.user.uid;
    return this.firestoreService.makeRequest({
      requestType: 'rolloverSprint',
      payload: {
        userId
      }
    });
  }
}

export { SprintService };
