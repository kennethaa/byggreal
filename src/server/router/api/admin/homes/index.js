import { Router } from 'express';
import Home from '../../../../../models/Home';
import { send200 } from '../../responses';

const homesRouter = new Router();

homesRouter.route('/')
.get((req, res, next) => {
    Home.find({})
    .then((homes) => send200(res, {
        homes
    }))
    .catch(next);
})
.post((req, res, next) => {
    new Home(req.body).save()
    .then((home) =>
        send200(res, {
            home
        })
    )
    .catch(next);
});

homesRouter.route('/:homeId')
.get((req, res, next) =>
    Home.findById(req.params.homeId)
    .then((home) =>
        send200(res, {
            home
        })
    )
    .catch(next)
)
.put((req, res, next) => {
    Home.findById(req.params.homeId)
    .then((home) =>
        Object.assign(home, req.body).save()
        .then((homeUpdated) =>
            send200(res, {
                home: homeUpdated
            })
        )
    )
    .catch(next);
})
.delete((req, res, next) => {
    Home.remove({
        _id: req.params.homeId
    })
    .then((home) =>
        send200(res, {
            home
        })
    )
    .catch(next);
});

export default homesRouter;
