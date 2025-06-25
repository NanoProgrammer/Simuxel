import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaManagerService } from 'src/prisma-manager/prisma-manager.service';
import { hash } from 'argon2';


@Injectable()
export class AuthService {
 constructor(private prisma : PrismaManagerService) {} 
  async register(createAuthDto: CreateAuthDto) {
    const user  =await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await hash(createAuthDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
    return newUser;

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
