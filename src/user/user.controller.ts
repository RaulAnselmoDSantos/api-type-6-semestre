import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Req, 
  ForbiddenException 
} from '@nestjs/common';
import { ApiParam, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto'; // DTO de alteração de senha
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@ApiTags('User')
@ApiBearerAuth('access-token') // Adiciona o esquema de segurança do Bearer
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  @Roles(Role.Admin) // Apenas usuários com a role ADMIN podem acessar essa rota
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  findAll() {
    console.log('Rota protegida acessada');
    return this.userService.findAll();
  }

  @Public() // Rota aberta
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @Roles(Role.Admin) // Apenas usuários com a role ADMIN podem acessar essa rota
  @ApiOperation({ summary: 'Retorna um dos usuários pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Comum) // Admin e usuários comuns podem acessar
  @ApiOperation({ summary: 'Atualiza informações do usuário' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @Req() req
  ) {
    const user = req.user; // Usuário autenticado
    const targetUserId = +id; // ID do usuário que está sendo atualizado

    // Verifica se o usuário é comum e está tentando atualizar outro usuário
    if (user.role === Role.Comum && user.id_usuario !== targetUserId) {
      throw new ForbiddenException('Você só pode atualizar suas próprias informações.');
    }

    return this.userService.update(targetUserId, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Comum) // Apenas admin e usuário comum podem acessar
  @ApiOperation({ summary: 'Exclui uma conta de usuário' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id') id: string, @Req() req) {
    const user = req.user;
    const userIdToDelete = +id;

    if (user.role === Role.Comum && user.id_usuario !== userIdToDelete) {
      throw new ForbiddenException('Você só pode excluir sua própria conta.');
    }

    return this.userService.remove(userIdToDelete);
  }

  // Adicionar rota para alteração de senha
  @Patch(':id/password')
  @Roles(Role.Admin, Role.Comum) // Admin e usuário comum podem acessar
  @ApiOperation({ summary: 'Atualiza a senha do usuário' })
  @ApiParam({ name: 'id', type: Number })
  async updatePassword(
    @Param('id') id: string, 
    @Body() updatePasswordDto: UpdatePasswordDto, 
    @Req() req
  ) {
    const user = req.user; // Usuário autenticado
    const targetUserId = +id;

    // Usuário comum só pode alterar sua própria senha
    if (user.role === Role.Comum && user.id_usuario !== targetUserId) {
      throw new ForbiddenException('Você só pode alterar sua própria senha.');
    }

    return this.userService.updatePassword(targetUserId, updatePasswordDto, user.role === Role.Admin);
  }
}
