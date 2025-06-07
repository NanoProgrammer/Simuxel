import express from "express";
import { UserModel } from "../model/postgres/db.js";
import { AuthController } from "../controller/Auth.js";
import passport from 'passport';
import '../controller/passport.js'
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

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
      process.env.SECRET_KEY,
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

const transporter = nodemailer.createTransport({
  service: 'gmail', // o 'hotmail', 'smtp.yourdomain.com', etc.
  auth: {
    user: process.env.EMAIL_USER, // tu correo
    pass: process.env.EMAIL_PASS, // tu clave o app password
  },
});

// Forgot password con JWT
AuthRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findByEmail(email);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  // Generar token JWT (expira en 15 minutos)
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "15m" }
  );

  const resetLink = `https://simuxel.vercel.app/reset-password/${token}`;

  // Enviar email
  await transporter.sendMail({
    from: '"Simuxel Support" <no-reply@simuxel.com>',
    to: email,
    subject: "Restablecer contraseña",
    html: `
      <h3>Hola ${user.name || "usuario"},</h3>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p><a href="${resetLink}">Haz clic aquí para cambiarla</a></p>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  });

  res.json({ message: "Correo enviado" });
});

// Reset password con verificación de JWT
AuthRouter.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(400).json({ error: "Token inválido o expirado" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userModel.update(payload.id, { password: hashedPassword });

  res.json({ message: "Contraseña actualizada correctamente" });
});


export default AuthRouter;