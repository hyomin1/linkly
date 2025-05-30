import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [LinkModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
