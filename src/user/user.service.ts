import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Role } from 'src/auth/roles.enum';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Verifica se o e-mail já existe
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: { email_usuario: createUserDto.email_usuario },
    });
    
    console.log('Resultado da busca pelo e-mail:', usuarioExistente);
    if (usuarioExistente != null) {
      throw new Error('E-mail já cadastrado');
    }
  
    // Criptografa a senha antes de salvar
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(createUserDto.senha_usuario, saltRounds);
    console.log('Senha criptografada:', senhaCriptografada); // Verifique a saída
    

    try {
      // Cria o usuário com a senha criptografada
      console.log('Tentativa de criar usuário com e-mail:', createUserDto.email_usuario);
      console.log('Consulta no banco por e-mail:', usuarioExistente);
      return await this.prisma.usuario.create({
        data: {
          nome_usuario: createUserDto.nome_usuario,
          email_usuario: createUserDto.email_usuario,
          cpf_usuario: createUserDto.cpf_usuario,
          senha_usuario: senhaCriptografada,
          telefone_usuario: createUserDto.telefone_usuario,
          tipo_usuario: createUserDto.tipo_usuario || Role.Comum, // Valor padrão
        },
      });
    } catch (error) {
      // Captura erros do Prisma, como restrição única
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && (error.meta?.target as string[])?.includes('email_usuario')) {
          throw new Error('O e-mail informado já está em uso.');
        }
      }
      throw error;
    }
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
  async findByEmail(email: string) {
    return this.prisma.usuario.findFirst({
      where: { email_usuario: email },
    });
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
