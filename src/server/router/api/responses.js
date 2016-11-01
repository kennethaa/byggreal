import setAge from '../setAge';

export function send200(res, data, age = 600) {
    if (age) {
        setAge(res, age);
    }
    return res.json({
        meta: {
            age
        },
        data
    });
}

export function send404(res, error = 'Not found', age = 10) {
    if (age) {
        setAge(res, 10);
    }
    return res.status(404).json({
        meta: {
            age
        },
        data: {
            error
        }
    });
}

export function send403(res, error = 'No token provided') {
    return res.status(403).json({
        meta: null,
        data: {
            error
        }
    });
}
