import { PrismaClient } from '@prisma/client';


export class UserModel {
  
  constructor() {
    const prisma = new PrismaClient();
    this.prisma = prisma;
  }

   async getAll() {
    const users = await this.prisma.user.findMany();
  return users.map(({ password, ...rest }) => rest);
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user 
  }
  async findByEmailNoPassword(email) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
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
      data,
    });
    return { ...user, password: undefined };
  }

}
