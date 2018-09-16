type AppConfig = {
  fb: {
    apikey: string;
    authdomain: string;
    databaseurl: string;
    projectid: string;
    storagebucket: string;
    messagingsenderid: string;
  };
};

const AppConfig: () => AppConfig = () => ({
  fb: {
    apikey: process.env.REACT_APP_FIREBASE_APIKEY!,
    authdomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
    databaseurl: process.env.REACT_APP_FIREBASE_DATABASE_URL!,
    projectid: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
    storagebucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
    messagingsenderid: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!
  }
});

console.log('env', process.env);
console.log('runtimeConfig', AppConfig());

export default AppConfig;
