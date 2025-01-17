import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException, NotFoundException, Req } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Veiculos')
@ApiBearerAuth('access-token') // Esquema de segurança Bearer no Swagger
@Controller('veiculos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  // Criar um novo veículo
  @Post()
  @Roles(Role.Admin, Role.Comum) // Apenas Admin e usuário comum podem criar
  @ApiOperation({ summary: 'Cria um novo veículo' })
  async create(@Body() createVeiculoDto: CreateVeiculoDto, @Req() req) {
    const user = req.user; // Obtém o usuário autenticado
    return this.veiculoService.create({ ...createVeiculoDto, id_usuario: user.id_usuario });
  }

  // Retorna todos os veículos (Apenas Admin)
  @Get()
  @Roles(Role.Admin) // Apenas Admin pode acessar
  @ApiOperation({ summary: 'Retorna todos os veículos (Apenas Admin)' })
  findAll() {
    return this.veiculoService.findAll();
  }
  
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lista os veículos do usuário autenticado' })
  async findMyVehicles(@Req() req) {
      const userId = req.user.id_usuario; // Obtem o id do usuário autenticado
      console.log('User ID recebido no request:', userId);
      if (!userId) {
          throw new Error('ID do usuário é necessário.');
      }
      return this.veiculoService.findByUserId(userId);
  }
  
  // Retorna um veículo pelo ID
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Retorna um veículo pelo ID' })
  async findOne(@Param('id') id: string, @Req() req) {
    const user = req.user; // Obtém o usuário autenticado
    const vehicle = await this.veiculoService.findOne(+id);

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    // Permite o acesso somente se o usuário for Admin ou o proprietário do veículo
    if (user.role !== Role.Admin && vehicle.id_usuario !== user.id_usuario) {
      throw new ForbiddenException('Você não tem permissão para acessar este veículo.');
    }

    return vehicle;
  }


  // Atualiza um veículo
  @Patch(':id')
  @Roles(Role.Admin, Role.Comum) // Admin e usuário comum podem acessar
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Atualiza um veículo pelo ID' })
  async update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto, @Req() req) {
      const user = req.user; // Usuário autenticado
      const vehicleIdToUpdate = +id;

      // Busca o veículo no banco
      const vehicle = await this.veiculoService.findOne(vehicleIdToUpdate);

      if (!vehicle) {
          throw new NotFoundException(`Veículo com ID ${vehicleIdToUpdate} não encontrado.`);
      }

      // Verifica se o usuário autenticado é admin ou o dono do veículo
      if (user.role !== Role.Admin && vehicle.id_usuario !== user.id_usuario) {
          throw new ForbiddenException('Você só pode atualizar seus próprios veículos.');
      }

      // Atualiza o veículo
      return this.veiculoService.update(vehicleIdToUpdate, updateVeiculoDto);
  }


  // Exclui um veículo
  @Delete(':id')
  @Roles(Role.Admin, Role.Comum) // Apenas Admin ou Dono pode excluir
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Exclui um veículo' })
  async remove(@Param('id') id: string, @Req() req) {
    const user = req.user; // O usuário autenticado que fez a requisição
    const vehicleIdToDelete = +id; // ID do veículo a ser excluído

    // Busca o veículo no banco para verificar o dono
    const vehicle = await this.veiculoService.findOne(vehicleIdToDelete);

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${vehicleIdToDelete} não encontrado.`);
    }

    // Verifica se o usuário autenticado é admin ou o dono do veículo
    if (user.role !== Role.Admin && vehicle.id_usuario !== user.id_usuario) {
      throw new ForbiddenException('Você só pode excluir seus próprios veículos.');
    }

    return this.veiculoService.remove(vehicleIdToDelete);
  }
}
