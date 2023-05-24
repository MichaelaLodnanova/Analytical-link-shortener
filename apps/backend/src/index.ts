import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { exampleValidator } from 'common/validators';

dotenv.config();
const api = express();
const port = 4000;

api.use(express.json());
api.use(cors());

const data = exampleValidator.safeParse({ name: 'john' });
console.log(data);

api.listen(port, () => console.log(`[Backend] listening on port ${port}`));
