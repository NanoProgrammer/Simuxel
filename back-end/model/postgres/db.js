import { PrismaClient } from '@prisma/client';

export class UserModel {
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
