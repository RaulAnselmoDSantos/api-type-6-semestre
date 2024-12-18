import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; // Permite acesso às rotas abertas
    }
    const request = context.switchToHttp().getRequest();
    console.log('Token recebido -> ', request.headers.authorization);
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('Erro no JwtAuthGuard:', err, info);
      throw err || new UnauthorizedException('Token inválido ou expirado');
    }
    console.log('Usuário autenticado no JwtAuthGuard:', user);
    return user;
  }
}