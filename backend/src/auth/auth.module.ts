import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaManagerService } from 'src/prisma-manager/prisma-manager.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaManagerService],
})
export class AuthModule {}
