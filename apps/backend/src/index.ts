import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();
const api = express();
const port = 4000;

api.use(express.json());
api.use(cors());

api.listen(port, () => console.log(`[Backend] listening on port ${port}`));
