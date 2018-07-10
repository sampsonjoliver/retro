import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
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
