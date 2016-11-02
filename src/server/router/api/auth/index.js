import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../../../../models/User';
import { send200Success, send200Token, send401 } from '../responses';

export const SECRET = process.env.SECRET || 'byggreal';

const auth = new Router();

auth.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return send401(res);
        }

        const token = jwt.sign({ username: user.username }, SECRET, {
            expiresIn: '1d'
        });

        return send200Token(res, token);
    })(req, res, next);
});

if (process.env.NODE_ENV === 'development') {
    auth.get('/setup', (req, res, next) => {
        const password = 'admin';

        User.register(new User({ username: 'admin' }), password, (err, user) => {
            if (err) {
                return next(err);
            }

            return send200Success(res, `User with username ${user.username} and password ${password} created`);
        });
    });

    auth.get('/cleanup', (req, res, next) => {
        User.remove({})
        .then(send200Success(res, 'Cleanup done'))
        .catch(next);
    });
}

export default auth;
