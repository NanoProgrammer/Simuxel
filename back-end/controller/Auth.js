import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export class AuthController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const existing = await this.userModel.findByEmail(email);
      if (existing) {
        return res.status(409).send("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role: 'user', // o 'admin' si quieres asignarlo manualmente
      });

      res.status(201).send(user); // sin password
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userModel.findByEmail(email);
      if (!user) return res.status(404).send("User does not exist");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Wrong password");

      // 👇 incluye el rol en el JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      const { password: _, ...userWithoutPassword } = user;

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          maxAge: 60 * 60 * 1000,
        })
        .send(userWithoutPassword);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
