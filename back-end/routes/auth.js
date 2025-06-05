import express from "express";
import { UserModel } from "../model/postgres/db.js";
import { AuthController } from "../controller/Auth.js";

const AuthRouter = express.Router();

const userModel = new UserModel();
const authController = new AuthController(userModel);

AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);

export default AuthRouter;