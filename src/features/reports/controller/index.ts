import { Router } from 'express';
import { route as coreRouter } from './core';

const router = Router();

router.use('/reports', coreRouter);

export { router };
