import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar um novo veículo
  async create(createVeiculoDto: CreateVeiculoDto) {
    return this.prisma.veiculo.create({
      data: {
        ...createVeiculoDto,
      },
    });
  }
  
  // Listar todos os veículos
  async findAll() {
    return this.prisma.veiculo.findMany({
      include: {
        usuario: true, // Inclui os dados do usuário vinculado, caso necessário
      },
    });
  }
  
  // Buscar veículos pelo ID do usuário
  async findByUserId(userId: number) {
    console.log('ID do usuário recebido em findByUserId:', userId);
    if (!userId) {
        throw new Error('ID do usuário é necessário.');
    }

    return this.prisma.veiculo.findMany({
        where: { id_usuario: userId }, // Filtra pelo ID do usuário
    });
  }

  // Encontrar um veículo por ID
  async findOne(id: number) {
    if (!id) {
        throw new Error('ID do veículo é necessário');
    }
    const vehicle = await this.prisma.veiculo.findUnique({
        where: { veiculo_id: id },
        include: {
            usuario: true, // Inclui informações do usuário, caso necessário
        },
    });

    if (!vehicle) {
        throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    return vehicle;
  }

  // Atualizar um veículo por ID
  async update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    return this.prisma.veiculo.update({
      where: { veiculo_id: id },
      data: updateVeiculoDto,
    });
  }

  // Remover um veículo por ID
  async remove(id: number) {
    const vehicle = await this.prisma.veiculo.findUnique({ where: { veiculo_id: id } });

    if (!vehicle) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado.`);
    }

    return this.prisma.veiculo.delete({ where: { veiculo_id: id } });
  }


}
