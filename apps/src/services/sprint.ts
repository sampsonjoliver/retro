import { FirestoreService } from './firestore';
import { action, autorun, observable, when } from 'mobx';
import { AuthService } from './auth';
import * as isPast from 'date-fns/is_past';
import { firestore } from 'firebase';

class SprintService {
  @observable public isCurrentSprintEnded: boolean = false;
  @observable public isSprintRollingOver: boolean = false;

  private firestoreService: FirestoreService;
  private authService: AuthService;

  constructor(firestoreService: FirestoreService, authService: AuthService) {
    this.firestoreService = firestoreService;
    this.authService = authService;

    this.watchCurrentSprint();
  }

  public watchCurrentSprint() {
    autorun(async () => {
      const currentSprintId = this.authService.user.currentSprintId;
      if (currentSprintId) {
        const sprint = await firestore()
          .collection('sprints')
          .doc(currentSprintId)
          .get();

        const currentSprint = sprint.data() as Sprint;
        this.isCurrentSprintEnded = isPast(currentSprint.endDate.toDate());
      }
    });
  }

  @action
  public async rolloverSprint() {
    const userId = this.authService.user.uid;
    const currentSprintId = this.authService.user.currentSprintId;
    const request = await this.firestoreService.makeRequest({
      requestType: 'rolloverSprint',
      payload: {
        userId
      }
    });

    this.isSprintRollingOver = true;
    when(
      () => this.authService.user.currentSprintId !== currentSprintId,
      () => {
        this.isSprintRollingOver = false;
      }
    );
  }
}

export { SprintService };
