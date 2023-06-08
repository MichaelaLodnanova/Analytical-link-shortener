import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AnonymizedUser } from 'common';
import routes from './routes';
import session from './middleware/sessionMiddleware';
declare module 'express-session' {
  interface SessionData {
    user: AnonymizedUser;
  }
}

dotenv.config();
const api = express();
const port = 4000;

api.use(bodyParser.json());
api.use(cookieParser());
api.use(express.json());
api.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
api.use(session());

api.use(routes);

api.listen(port, () => console.log(`[Backend] listening on port ${port}`));
