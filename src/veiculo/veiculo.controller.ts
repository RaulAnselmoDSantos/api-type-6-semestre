import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@ApiTags('Veiculos') // Adiciona o grupo "Veiculos" no Swagger
@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo veículo' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os veículos' })
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number }) // Define o tipo do parâmetro para Swagger
  @ApiOperation({ summary: 'Retorna um veículo pelo ID' })
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Atualiza um veículo pelo ID' })
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(+id, updateVeiculoDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOperation({ summary: 'Remove um veículo pelo ID' })
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(+id);
  }
}