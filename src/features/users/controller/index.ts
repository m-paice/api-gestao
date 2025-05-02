import { Router } from 'express';
import { route as loginRouter } from './login';
import { route as adminRouter } from './admin';

const router = Router();

router.use('/auth', loginRouter);
router.use('/user/admin', adminRouter);

export { router };
