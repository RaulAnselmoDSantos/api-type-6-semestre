import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; 
import { AppControllerAPI } from './app.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { VeiculoModule } from './veiculo/veiculo.module'; 
import { VeiculoController } from './veiculo/veiculo.controller';
import { VeiculoService } from './veiculo/veiculo.service';


@Module({
  imports: [PrismaModule, VeiculoModule], // Registrar o PrismaModule
  controllers: [AppController,UserController, AppControllerAPI, VeiculoController],
  providers: [AppService, UserService, VeiculoService],
})
export class AppModule {}
