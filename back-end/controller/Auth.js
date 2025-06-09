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
        return res.status(409).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role: 'user', // puedes cambiar a 'admin' manualmente si quieres
      });

      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await this.userModel.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Wrong password" });
      }

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
        .json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
