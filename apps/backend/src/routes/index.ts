import { Router } from 'express';
import authRouter from './auth';
import statsRouter from './stats';

const router = Router();

router.use('/auth', authRouter);
router.use('/stats', statsRouter);

export default router;
