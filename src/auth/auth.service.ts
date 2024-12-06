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
    if (user && await this.userService.comparePasswords(senha, user.senha_usuario)) {
      const { senha_usuario, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email_usuario, senha_usuario } = loginDto;
  
    // Buscar usuário pelo email
    const user = await this.userService.findByEmail(email_usuario);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(senha_usuario, user.senha_usuario);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    // Gerar token JWT
    const payload = { username: user.email_usuario, sub: user.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
