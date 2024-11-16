import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // Importar o PrismaModule
import { UsuarioService } from './user/usuario.service';
import { UsuarioController } from './user/usuario.controller';
import { AppControllerAPI } from './app.controller';

@Module({
  imports: [PrismaModule], // Registrar o PrismaModule
  controllers: [AppController,UsuarioController, AppControllerAPI],
  providers: [AppService, UsuarioService],
})
export class AppModule {}
