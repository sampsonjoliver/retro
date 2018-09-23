import { functions } from 'firestore-request';
import { SprintService } from '../models/sprint';

interface SprintRolloverRequest {
  userId: string;
}

const rolloverSprint = functions
  .request('rolloverSprint')
  .onRequest<SprintRolloverRequest>((params, context) => {
    return SprintService.rolloverSprintForUser(params.data.payload.userId);
  });

export { rolloverSprint };
