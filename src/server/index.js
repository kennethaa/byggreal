import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { log, logError } from '../utils/logger';
import router from './router';

const app = express();

// Express middlewares
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Express middlewares in production
// if (app.get('env') === 'production') {
//
// }

// Express middlewares in development
// if (app.get('env') === 'development') {
    // if (webpackDevMiddleware) {
    //     app.use(webpackDevMiddleware);
    // }
    //
    // if (webpackHotMiddleware) {
    //     app.use(webpackHotMiddleware);
    // }
// }

// Set /public as our static content dir
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(router);

// Generic server errors (e.g. not caught by components)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    logError(err, req);

    res.status(500).json({
        error: app.get('env') === 'development' ? err.stack || err.message || err : 'Internal server error'
    });
});

app.set('port', process.env.PORT || 8080);

// Finally, start the express server
app.listen(app.get('port'), (err) => {
    if (err) logError(err);
    log(`Express ${app.get('env')} server listening on ${app.get('port')}`);
});
