import { Router } from 'express';
import setAge from './setAge';
import finn from '../finn';

// errors
const NOT_FOUND = 'Not found';
const INVALID_ID = 'Invalid id';

// routes
const API = 'api';

// params
const ID = 'id';

function sendResponse(res, data, meta = null) {
    setAge(res, 600);
    return res.json({
        meta,
        data
    });
}

function send404(res, error = NOT_FOUND) {
    setAge(res, 10);
    return res.status(404).json({
        error
    });
}

const router = new Router();

router.use(`/${API}/*`, (req, res, next) => {
    // CORS on ExpressJS
    // http://enable-cors.org/server_expressjs.html
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    return next();
});

router.param(ID, (req, res, next, id) => {
    if (!new RegExp('^[0-9]{1,12}$', 'i').test(id)) {
        return send404(res, INVALID_ID);
    }

    return next();
});

router.get(`/${API}/finn/:${ID}`, (req, res, next) => {
    finn(req.params.id)
    .then((text) => sendResponse(res, text))
    .catch(next);
});

router.get('/*', (req, res) => send404(res));

export default router;
