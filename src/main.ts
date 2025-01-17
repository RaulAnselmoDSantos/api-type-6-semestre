import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug'] });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API AppOo')
    .setDescription('Documentação da API Appoo - Protegida com JWT')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: true,
    });
    SwaggerModule.setup('/api', app, document);

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
