import { Router } from 'express';
import authRouter from './auth';
import statsRouter from './stats';
import linkRouter from './link';
import advertisementRouter from './advertisement';

const router = Router();

router.use('/auth', authRouter);
router.use('/stats', statsRouter);
router.use('/link', linkRouter);
router.use('/advertisement', advertisementRouter);

export default router;
