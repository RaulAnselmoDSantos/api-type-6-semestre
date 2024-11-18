import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // Importar o PrismaModule
import { AppControllerAPI } from './app.controller';

import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';


@Module({
  imports: [PrismaModule], // Registrar o PrismaModule
  controllers: [AppController,UserController, AppControllerAPI],
  providers: [AppService, UserService],
})
export class AppModule {}
