import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtém os papéis necessários para a rota atual
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se nenhuma role for requerida, permite acesso
    if (!requiredRoles) {
      return true;
    }

    // Obtém o usuário da requisição
    const { user } = context.switchToHttp().getRequest();

    // Logs para depuração
    console.log('Usuário autenticado:', user);
    console.log('Papéis necessários:', requiredRoles);
    console.log('Papéis necessários:', requiredRoles);
    console.log('Papel do usuário:', user?.role);
    console.log('Acesso permitido:', requiredRoles.some((role) => user?.role === role));


    // Verifica se o usuário possui algum dos papéis necessários
    return requiredRoles.some((role) => user?.role === role);
  }
}
