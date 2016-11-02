import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { send401, send403 } from '../responses';
import { SECRET } from '../auth';
import homes from './homes';
import lettings from './lettings';

const admin = new Router();

admin.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return send403(res);
    }

    return jwt.verify(token, SECRET, (err) => {
        if (err) {
            return send401(res, 'Failed to authenticate token');
        }

        return next();
    });
});

admin.use('/homes', homes);
admin.use('/lettings', lettings);

export default admin;
