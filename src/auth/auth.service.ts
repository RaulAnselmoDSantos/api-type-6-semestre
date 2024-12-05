import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

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

  async login(user: any) {
    const payload = { email: user.email, sub: user.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
