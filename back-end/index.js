import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import UserRouter from './routes/users.js';
import {UserModel} from './model/postgres/db.js';
import {MiddleCors} from './middleware/cors.js'
import cookieParser from "cookie-parser";
import AuthRouter from './routes/auth.js';


const app = express();

const AcceptedOrigin = ['https://simuxel.vercel.app/', 'http://localhost:3000'];
const PORT = process.env.PORT || 3000;
const UserFunction = new UserModel();
const API_KEY = process.env.API_SECRET ;


app.use((req, res, next) => {
  const key = req.headers['x-api-key'];
  const isValid =['/auth/google','/auth/google/callback'];
  const isPublic = isValid.some(route => req.path.startsWith(route));
  if(isPublic ) {
    return next();
  }
   else if (key !== API_KEY) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(MiddleCors({AcceptedOrigin}));
app.options('*', MiddleCors({ AcceptedOrigin }));
app.use('/users', UserRouter({ UserModel: UserFunction }));
app.use('/auth', AuthRouter);


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));