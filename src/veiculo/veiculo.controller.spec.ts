import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoController } from './veiculo.controller';
import { VeiculoService } from './veiculo.service';
import { PrismaService } from '../prisma/prisma.service';

describe('VeiculoController', () => {
  let controller: VeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [VeiculoService, PrismaService], // Adicione o PrismaService e VeiculoService aqui
    }).compile();

    controller = module.get<VeiculoController>(VeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
