import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaManagerService } from 'src/prisma-manager/prisma-manager.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
 constructor(private prisma : PrismaManagerService, private jwt: JwtService) {} 
  async register(createAuthDto: CreateAuthDto) {
    const user  =await this.prisma.user.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    if(createAuthDto.password.length < 6) {
      throw new ConflictException('Password must be at least 6 characters long');
    }
    const hashedPassword = await argon.hash(createAuthDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    });
    newUser.password = undefined; // Remove password from the response
    return newUser;

  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }

    return this.signToken(user.id, user.email);
    
  }

  async signToken(userId: string, email: string) {
    const data = {
      sub: userId,
      email: email,
    };
    const token = await this.jwt.signAsync(data, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });

        return {
            access_token: token
        }
    }
}
