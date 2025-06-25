import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaManagerService } from './prisma-manager/prisma-manager.service';


@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaManagerService],
})
export class AppModule {}
