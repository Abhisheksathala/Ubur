import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// routes

import UserRouter from './src/Routes/UserRouter.js';
import captainRouter from './src/Routes/CaptainRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Routes config

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/captain', captainRouter);

export { app };
