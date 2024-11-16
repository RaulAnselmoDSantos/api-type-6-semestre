import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Conectar ao banco de dados
    console.log('Prisma conectado ao banco de dados.');
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconectar ao destruir o módulo
    console.log('Prisma desconectado do banco de dados.');
  }
}
