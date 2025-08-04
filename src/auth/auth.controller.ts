import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Recebido no Controller:', loginDto);
    console.log('Email recebido:', loginDto.email_usuario);
    console.log('Senha recebida:', loginDto.senha_usuario);
    if (!loginDto.senha_usuario || !loginDto.email_usuario) {
      throw new UnauthorizedException('Email e senha são obrigatórios.');
    }
    const user = await this.authService.validateUser(
      loginDto.email_usuario,
      loginDto.senha_usuario,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(loginDto);
  }
}
