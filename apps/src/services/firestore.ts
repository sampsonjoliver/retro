import { FirestoreObservableFactory } from 'react-firestore-mobx-bindings';
import { action } from 'mobx';
import * as firebase from 'firebase';
import * as uuid from 'uuid/v4';
import { request, Request } from '../utils/request';

class FirestoreService extends FirestoreObservableFactory {
  public makeRequest(requestData: Request) {
    return request(requestData);
  }

  constructor(name: string) {
    super(name);
  }
}

export { FirestoreService };
