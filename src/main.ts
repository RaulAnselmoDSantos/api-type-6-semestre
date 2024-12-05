import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Appoo')
    .setDescription('Documentação da API Appoo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document); // URL do Swagger: /api

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .filter((layer) => layer.route)
    .map((layer) => `${layer.route.stack[0].method.toUpperCase()} ${layer.route.path}`);
  Logger.log(`Available routes: ${JSON.stringify(availableRoutes)}`);


  // Habilitar validação global
  app.useGlobalPipes(
    new ValidationPipe({
    transform: true,
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Retorna erro se propriedades não esperadas forem enviadas
  }),);


  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
