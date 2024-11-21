import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@ApiTags('App')
@Controller('api') // Define o prefixo da rota como '/api'
export class AppControllerAPI {
  @Get()
  getRootMessage() {
    return { message: 'Bem-vindo à API!' };
  }
}
