import express from "express";
import { UserModel } from "../model/postgres/db.js";
import { AuthController } from "../controller/Auth.js";
import passport from 'passport';
import '../controller/passport.js'
import jwt from 'jsonwebtoken';

const AuthRouter = express.Router();

const userModel = new UserModel();
const authController = new AuthController(userModel);

AuthRouter.post("/register", authController.register);
AuthRouter.post("/login", authController.login);
AuthRouter.post("/logout", (req, res) => {
      res.clearCookie("access_token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
});
 res.status(200).json({ message: "Sesión cerrada" }); 

});

// Redirige a Google
AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback después de Google
AuthRouter.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'None',
      maxAge: 60 * 60 * 1000,
    });

    // Redirige al frontend ya logueado
    res.redirect('https://simuxel.vercel.app/user'); // ajusta
  }
);

export default AuthRouter;