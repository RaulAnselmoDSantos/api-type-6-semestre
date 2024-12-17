import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiParam, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
 
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuario' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  findAll() {
    console.log('Rota protegida acessada');
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um dos usuarios pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuario pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuario pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
