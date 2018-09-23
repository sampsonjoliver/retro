import { firestore } from 'firebase';

interface Request {
  requestType: string;
  status?: 'pending' | 'success' | 'failed';
  payload: object;
}

const request = (req: Request) =>
  firestore()
    .collection('requests')
    .doc('root')
    .collection(req.requestType)
    .add({
      ...req,
      status: req.status || 'pending'
    });

export { request, Request };
