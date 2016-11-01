import { Router } from 'express';
import authenticate from './authenticate';
import admin from './admin';
import finn from './finn';
import { logError } from '../../../utils/logger';

const api = new Router();

api.use((req, res, next) => {
    // CORS on ExpressJS
    // http://enable-cors.org/server_expressjs.html
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return next();
});

api.use('/authenticate', authenticate);
api.use('/admin', admin);
api.use('/finn', finn);

api.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    logError(err, req);

    res.status(500).json({
        data: {
            meta: null,
            error: process.env.NODE_ENV === 'development' ? err.stack || err.message || err : 'Internal server error'
        }
    });
});

export default api;
