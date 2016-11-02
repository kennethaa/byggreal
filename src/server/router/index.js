import { Router } from 'express';
import api from './api';
import app from './app';

const router = new Router();

router.use('/api', api);
router.use(app);

export default router;
