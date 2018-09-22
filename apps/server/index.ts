import * as functions from 'firebase-functions';
const nextPackage = require('next');

const dev = process.env.NODE_ENV !== 'production';
const config = functions.config();
const nextServer = nextPackage({
  dev,
  conf: {
    distDir: 'app',
    serverRuntimeConfig: config,
    publicRuntimeConfig: config
  }
});
const handler = nextServer.getRequestHandler();

const next = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl);
  return nextServer.prepare().then(() => handler(req, res));
});

export const app = {
  next
};
