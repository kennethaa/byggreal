import { Router } from 'express';
import auth from './auth';
import admin from './admin';
import finn from './finn';
import { logError } from '../../../utils/logger';
import { send500 } from './responses';

const api = new Router();

api.use((req, res, next) => {
    // CORS on ExpressJS
    // http://enable-cors.org/server_expressjs.html
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return next();
});

api.use('/auth', auth);
api.use('/admin', admin);
api.use('/finn', finn);

api.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    logError(err, req);

    send500(res, err.stack || err.message || err);
});

export default api;
