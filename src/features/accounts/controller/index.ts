import { Router } from 'express';
import { route as adminRouter } from './admin';

const router = Router();

router.use('/account/admin', adminRouter);

export { router };
