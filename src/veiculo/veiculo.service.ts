import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(private readonly prisma: PrismaService) {}

  // Criar um novo veiculo
  async create(createVeiculoDto: CreateVeiculoDto) {
    return this.prisma.veiculo.create({
      data: {
        ...createVeiculoDto,
      },
    });
  }

  // Listar todos os usuários
  async findAll() {
    return this.prisma.veiculo.findMany({
      include: {
        usuario: true, // Inclui os dados do usuário vinculado, caso necessário
      },
    });
  }

  // Encontrar um usuário por ID
  async findOne(id: number) {
    return this.prisma.veiculo.findUnique({
      where: { veiculo_id: id },
      include: {
        usuario: true, // Inclui informações do usuário, caso necessário
      },
    });
  }

  // Atualizar um usuário por ID
  async update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    return this.prisma.veiculo.update({
      where: { veiculo_id: id },
      data: updateVeiculoDto,
    });
  }

  // Remover um usuário por ID
  async remove(id: number) {
    return this.prisma.veiculo.delete({
      where: { veiculo_id: id },
    });
  }
}
