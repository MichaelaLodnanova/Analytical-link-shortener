import bodyParser from 'body-parser';
import { AnonymizedUser } from 'common';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { formatISO } from 'date-fns';
import * as dotenv from 'dotenv';
import express from 'express';
import JSONBig from 'json-bigint';

import session from './middleware/sessionMiddleware';
import routes from './routes';

// Make express handle big ints
JSON.parse = JSONBig.parse;
JSON.stringify = JSONBig.stringify;

declare module 'express-session' {
  interface SessionData {
    user: AnonymizedUser;
  }
}

dotenv.config();
const api = express();
const port = 4000;

api.use(bodyParser.json({ limit: '10mb' }));
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
