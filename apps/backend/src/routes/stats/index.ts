import { Router } from 'express';
import linkStatsRouter from './link';

const statsRouter = Router();

statsRouter.use('/link', linkStatsRouter);

export default statsRouter;
