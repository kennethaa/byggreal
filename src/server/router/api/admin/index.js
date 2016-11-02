import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import { send200, send401, send403 } from '../responses';
import { SECRET } from '../auth';

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

if (process.env.NODE_ENV === 'development') {
    admin.get('/users', (req, res, next) => {
        User.find({})
        .then((users) => send200(res, {
            users
        }))
        .catch(next);
    });
}

export default admin;
