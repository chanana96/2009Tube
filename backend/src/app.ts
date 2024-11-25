import express, { query } from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import {db} from './config/database_config'
import authRouter from './routes/auth_routes'
import queryRouter from './routes/query_routes';
import cookieParser from 'cookie-parser';

require('dotenv').config()


const app: Express = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser())

db()

app.use('/auth', authRouter);
app.use('/query', queryRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  next(err.stack)
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;