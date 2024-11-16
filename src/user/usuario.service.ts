import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  // Método para buscar todos os usuários
  async getAllUsuarios() {
    return this.prisma.usuario.findMany(); // "usuario" deve corresponder ao nome do modelo gerado no Prisma
  }

  // Método para buscar um usuário pelo CPF
  async getUsuarioByCpf(cpf: string) {
    return this.prisma.usuario.findUnique({
      where: {
        cpf_usuario: cpf,
      },
    });
  }
}
