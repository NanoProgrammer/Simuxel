import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';

import { MiddleCors } from './middleware/cors.js';
import { requireAuth } from './middleware/auth.js';

import { UserModel } from './model/postgres/db.js';
import UserRouter from './routes/users.js';
import AuthRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;
const AcceptedOrigin = ['https://simuxel.vercel.app', 'http://localhost:3000'];

const UserFunction = new UserModel();

app.use(MiddleCors({ AcceptedOrigin }));
app.use(express.json());
app.use(cookieParser());

// Rutas públicas
app.use('/auth', AuthRouter());

// Rutas protegidas
app.use('/users', requireAuth, UserRouter({ UserModel: UserFunction }));

app.listen(PORT, () => {
  console.log(`Secure API running on port ${PORT}`);
});
