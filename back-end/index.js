import express from 'express';
import UserRouter from './routes/users.js';
import {UserModel} from './model/postgres/db.js';
import {MiddleCors} from './middleware/cors.js'
import cookieParser from "cookie-parser";
import AuthRouter from './routes/auth.js';


const app = express();

const AcceptedOrigin = ['http://localhost:3000', 'https://example.com'];
const PORT = process.env.PORT || 3000;
const UserFunction = new UserModel();

app.use(express.json());
app.use(cookieParser());
app.use(MiddleCors({AcceptedOrigin}));
app.use('/users', UserRouter({ UserModel: UserFunction }));
app.use('/auth', AuthRouter);


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));