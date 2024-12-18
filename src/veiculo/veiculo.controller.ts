import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';

@ApiTags('Veiculos') // Tag para documentação no Swagger
@ApiBearerAuth('access-token') // Esquema de segurança Bearer para o Swagger
@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Public() // Rota pública
  @Post()
  @ApiOperation({ summary: 'Cria um novo veículo' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @UseGuards(JwtAuthGuard) // Rota protegida
  @Get()
  @ApiOperation({ summary: 'Retorna todos os veículos' })
  findAll() {
    console.log('Rota protegida - Veículos');
    return this.veiculoService.findAll();
  }

  @UseGuards(JwtAuthGuard) // Rota protegida
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Retorna um veículo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) // Rota protegida
  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Atualiza um veículo pelo ID' })
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(+id, updateVeiculoDto);
  }

  @UseGuards(JwtAuthGuard) // Rota protegida
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Remove um veículo pelo ID' })
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(+id);
  }
}
