import { Router } from 'express';
import path from 'path';
import { logError } from '../../../utils/logger';

const app = new Router();

app.get('*', (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        const compiler = require('../../../config/compiler');
        const filename = path.join(compiler.outputPath, 'index.html');

        return compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }

            res.set('content-type', 'text/html');
            return res.send(result);
        });
    }

    return res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    logError(err, req);

    res.status(500).send(process.env.NODE_ENV === 'development' ? err.stack || err.message || err : 'Internal server error');
});

export default app;
