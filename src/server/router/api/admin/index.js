import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import { send200, send403 } from '../responses';
import { SECRET } from '../authenticate';

const admin = new Router();

admin.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return send403(res);
    }

    return jwt.verify(token, SECRET, (err) => {
        if (err) {
            return send200(res, {
                success: false,
                message: 'Failed to authenticate token.'
            }, 0);
        }

        return next();
    });
});

if (process.env.NODE_ENV === 'development') {
    admin.get('/setup', (req, res, next) => {
        const username = 'admin';
        const password = 'admin';

        const user = new User({
            username,
            password
        });

        user.save()
        .then(send200(res, {
            success: true,
            message: `User with username ${username} and password ${password} created.`
        }, 0))
        .catch(next);
    });

    admin.get('/users', (req, res, next) => {
        User.find({})
        .then((users) => send200(res, {
            users
        }))
        .catch(next);
    });
}

export default admin;
