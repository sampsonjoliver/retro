import * as functions from 'firebase-functions';
const nextPackage = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextServer = nextPackage({ dev, conf: { distDir: 'app' } });
const handler = nextServer.getRequestHandler();

const next = functions.https.onRequest((req, res) => {
    console.log('File: ' + req.originalUrl);
    return nextServer.prepare().then(() => handler(req, res));
  });
  
export const app = {
    next
}
