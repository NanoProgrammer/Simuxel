import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRECT_KEY = process.env.SECRECT_KEY;

export class AuthController {
     constructor(userModel) {
        this.userModel = userModel;
     }
     async register(req,res){
        const { name, email, password } = req.body;

    try {
      // Verificar si ya existe un usuario con ese email
      const existing = await this.userModel.findByEmail(email);
      if (existing) {
        return res.status(409).send("User already exists");
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).send(user); // ya sin password gracias al model
    } catch (error) {
      res.status(500).send(error.message);
    }
     }
     async login(req,res){
        const { email, password } = req.body;

    try {
      const user = await this.userModel.findByEmail(email)

      if (!user) return res.status(404).send("User not found");

      // Comparar la contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Invalid credentials");

      // Generar JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRECT_KEY, {
        expiresIn: "1h",
      });

      const { password: _, ...userWithoutPassword } = user;

      // Enviar cookie y datos del usuario
      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000, // 1 hora
        })
        .send(userWithoutPassword);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}