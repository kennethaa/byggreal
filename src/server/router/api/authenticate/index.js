import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import { send200 } from '../responses';

export const SECRET = process.env.SECRET || 'byggreal';

const authenticate = new Router();

authenticate.post('/', (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
    .then((user) => {
        if (!user) {
            return send200(res, {
                success: false,
                message: 'Authentication failed. User not found.'
            }, 0);
        }

        if (user.password !== req.body.password) {
            return send200(res, {
                success: false,
                message: 'Authentication failed. Wrong password.'
            }, 0);
        }

        const token = jwt.sign({ username: user.username }, SECRET, {
            expiresIn: '1d'
        });

        return send200(res, {
            success: true,
            message: 'Enjoy your token!',
            token
        }, 0);
    })
    .catch(next);
});

export default authenticate;
