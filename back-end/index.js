import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';

class UserModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findByEmailNoPassword(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,         // 👈 AÑADIDO
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async findById(id) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? { ...user, password: undefined } : null;
  }

  async update(id, data) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user ? { ...user, password: undefined } : null;
  }

  async delete(id) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async create(data) {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        role: data.role , // 👈 AÑADIDO: default si no viene
      },
    });
    return { ...user, password: undefined };
  }
}


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;
const app = express();
const userModel = new UserModel();

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword, role });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    const { password: _, ...userData } = user;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,
    }).send(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("access_token").send("Logged out");
});

app.get("/me", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findByEmailNoPassword(decoded.email);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(403).send("Invalid or expired token");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
