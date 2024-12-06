import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TipoUsuario } from './user.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar um novo usuário
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.senha_usuario);
    const userData = {
      ...createUserDto,
      senha_usuario: hashedPassword,
      tipo_usuario: createUserDto.tipo_usuario || TipoUsuario.Cliente, // Cliente como padrão
    };
  
    return this.prisma.usuario.create({
      data: userData,
    });
  }

  // Listar todos os usuários
  async findAll() {
    return this.prisma.usuario.findMany();
  }

  // Encontrar um usuário por ID
  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id_usuario: id },
    });
  }

  // Atualizar um usuário por ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: updateUserDto,
    });
  }

  // Remover um usuário por ID
  async remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id_usuario: id },
    });
  }

  // Encontrar um usuário por e-mail
  async findByEmail(email: string){
    return this.prisma.usuario.findUnique({
      where: { email_usuario: email}
    })
  }

  // Comparar senhas
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
