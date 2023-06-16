import { Router } from 'express';
import linkStatsRouter from './link';
import advertisementStatsRouter from './advertisement';

const statsRouter = Router();

statsRouter.use('/link', linkStatsRouter);
statsRouter.use('/advertisement', advertisementStatsRouter);

export default statsRouter;
