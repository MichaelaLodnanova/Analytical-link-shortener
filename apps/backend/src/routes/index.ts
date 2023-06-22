import { Router } from 'express';
import authRouter from './auth';
import statsRouter from './stats';
import linksRouter from './links';
import advertisementsRouter from './advertisements';

const router = Router();

router.use('/auth', authRouter);
router.use('/stats', statsRouter);
router.use('/links', linksRouter);
router.use('/advertisements', advertisementsRouter);

export default router;
