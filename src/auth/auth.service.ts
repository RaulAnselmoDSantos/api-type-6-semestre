import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    console.log('Usuário encontrado:', user); // Log do usuário retornado
    console.log('Senha no banco:', user?.senha_usuario); // Log do hash da senha no banco


    // Verifica se o usuário existe e se a senha está definida
    if (!user || !user.senha_usuario) {
      console.error('Usuário não encontrado ou senha ausente.');
      return null; // Usuário não encontrado ou sem senha válida
    }
    
    // Compara a senha fornecida com o hash
    const isMatch = await bcrypt.compare(senha, user.senha_usuario);

    console.error('Usuário não encontrado ou senha ausente.');

    if (isMatch) {
        const { senha_usuario, ...result } = user;
        return result; // Retorna os dados do usuário sem a senha
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email_usuario, senha_usuario } = loginDto;

    console.log('Email recebido:', email_usuario);
    console.log('Senha recebida:', senha_usuario);
  
    // Buscar usuário pelo email
    const user = await this.userService.findByEmail(email_usuario);
    console.log('Usuário encontrado:', user);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    console.log('Comparando senhas...');
    console.log('Senha recebida (não criptografada):', senha_usuario);
    console.log('Hash da senha no banco:', user.senha_usuario);

    if (typeof senha_usuario !== 'string' || typeof user.senha_usuario !== 'string') {
      console.error('Erro: senha_usuario ou hash inválido.');
      throw new UnauthorizedException('Erro no processamento da senha.');
    }
  
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha_usuario, user.senha_usuario);
    if (!isPasswordValid) {
      console.log('Senha inválida');
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    // Gerar token JWT
    const payload = { username: user.email_usuario, sub: user.id_usuario };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };

  }
}
