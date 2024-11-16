import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios') // Define a rota base: /usuarios
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  // Rota para obter todos os usuários
  @Get()
  async getAllUsuarios() {
    return this.usuarioService.getAllUsuarios();
  }

  // Rota para obter um usuário por CPF
  @Get(':cpf')
  async getUsuarioByCpf(@Param('cpf') cpf: string) {
    return this.usuarioService.getUsuarioByCpf(cpf);
  }
}
