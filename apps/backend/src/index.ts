import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

const wrong = 1;
console.log(wrong);
api.use(express.json());
api.use(cors());

api.listen(port, () => console.log(`[Backend] is listening on port ${port}`));
