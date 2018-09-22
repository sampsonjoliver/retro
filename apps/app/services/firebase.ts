import firebase from 'firebase';

import 'firebase/firestore';
import 'firebase/auth';
import AppConfig from '../utils/config';

const appConfig = AppConfig();
const config = {
  apiKey: appConfig.fb.apikey,
  authDomain: appConfig.fb.authdomain,
  databaseURL: appConfig.fb.databaseurl,
  projectId: appConfig.fb.projectid,
  storageBucket: appConfig.fb.storagebucket,
  messagingSenderId: appConfig.fb.messagingsenderid
};

const initializeApp = () => {
  try {
    firebase.initializeApp(config);

    const firestore = firebase.firestore();

    firestore.settings({ timestampsInSnapshots: true });

    firestore
      .enablePersistence()
      .then(() => console.log('Firestore persistence enabled'))
      .catch(error => console.log('Firestore persistence unavailable', error));
  } catch (err) {
    if (err.code !== 'app/duplicate-app') {
      console.error(err);
    }
  }
};

export { initializeApp };
