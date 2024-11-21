import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoService } from './veiculo.service';
import { PrismaService } from '../prisma/prisma.service';

  let veiculoService: VeiculoService;
  let prismaService: PrismaService;

describe('VeiculoService', () => {

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculoService, PrismaService],
    }).compile();

    veiculoService = module.get<VeiculoService>(VeiculoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(veiculoService).toBeDefined();
  });
});

describe('create', () => {

  it('deve criar um novo veículo', async () => {
    const createVeiculoDto = {
      veiculo_marca: 'Toyota',
      veiculo_modelo: 'Corolla',
      veiculo_cor: 'Preto',
      veiculo_placa: 'XYZ-1234',
      veiculo_motor: '2.0',
      veiculo_km: 15000,
      id_usuario: 1,
    };

    jest.spyOn(prismaService.veiculo, 'create').mockResolvedValue({
      veiculo_id: 1,
      ...createVeiculoDto,
    });

    const result = await veiculoService.create(createVeiculoDto);
    expect(result).toEqual({
      veiculo_id: 1,
      ...createVeiculoDto,
    });
    expect(prismaService.veiculo.create).toHaveBeenCalledWith({
      data: createVeiculoDto,
    });
  });
});

describe('findAll', () => {
  it('deve retornar todos os veículos', async () => {
    const veiculos = [
      {
        veiculo_id: 1,
        veiculo_marca: 'Toyota',
        veiculo_modelo: 'Corolla',
        veiculo_cor: 'Preto',
        veiculo_placa: 'XYZ-1234',
        veiculo_motor: '2.0',
        veiculo_km: 15000,
        id_usuario: 1,
      },
      {
        veiculo_id: 2,
        veiculo_marca: 'Honda',
        veiculo_modelo: 'Civic',
        veiculo_cor: 'Branco',
        veiculo_placa: 'ABC-5678',
        veiculo_motor: '1.8',
        veiculo_km: 10000,
        id_usuario: 2,
      },
    ];

    jest.spyOn(prismaService.veiculo, 'findMany').mockResolvedValue(veiculos);

    const result = await veiculoService.findAll();
    expect(result).toEqual(veiculos);
    expect(prismaService.veiculo.findMany).toHaveBeenCalled();
  });
});

describe('findOne', () => {
  it('deve retornar um veículo pelo ID', async () => {
    const veiculo = {
      veiculo_id: 1,
      veiculo_marca: 'Toyota',
      veiculo_modelo: 'Corolla',
      veiculo_cor: 'Preto',
      veiculo_placa: 'XYZ-1234',
      veiculo_motor: '2.0',
      veiculo_km: 15000,
      id_usuario: 1,
    };

    jest.spyOn(prismaService.veiculo, 'findUnique').mockResolvedValue(veiculo);

    const result = await veiculoService.findOne(1);
    expect(result).toEqual(veiculo);
    expect(prismaService.veiculo.findUnique).toHaveBeenCalledWith({
      where: { veiculo_id: 1 },
      include: { usuario: true }, // Inclua o relacionamento no teste
    });
  });

  it('deve retornar null se o veículo não for encontrado', async () => {
    jest.spyOn(prismaService.veiculo, 'findUnique').mockResolvedValue(null);

    const result = await veiculoService.findOne(999);
    expect(result).toBeNull();
    expect(prismaService.veiculo.findUnique).toHaveBeenCalledWith({
      where: { veiculo_id: 999 },
      include: { usuario: true }, // Inclua o relacionamento no teste
    });
  });
});

describe('update', () => {
  it('deve atualizar um veículo pelo ID', async () => {
    const updateVeiculoDto = {
      veiculo_cor: 'Azul',
    };

    const updatedVeiculo = {
      veiculo_id: 1,
      veiculo_marca: 'Toyota',
      veiculo_modelo: 'Corolla',
      veiculo_cor: 'Azul',
      veiculo_placa: 'XYZ-1234',
      veiculo_motor: '2.0',
      veiculo_km: 15000,
      id_usuario: 1,
    };

    jest.spyOn(prismaService.veiculo, 'update').mockResolvedValue(updatedVeiculo);

    const result = await veiculoService.update(1, updateVeiculoDto);
    expect(result).toEqual(updatedVeiculo);
    expect(prismaService.veiculo.update).toHaveBeenCalledWith({
      where: { veiculo_id: 1 },
      data: updateVeiculoDto,
    });
  });
});

describe('remove', () => {
  it('deve remover um veículo pelo ID', async () => {
    jest.spyOn(prismaService.veiculo, 'delete').mockResolvedValue({
      veiculo_id: 1,
      veiculo_marca: 'Toyota',
      veiculo_modelo: 'Corolla',
      veiculo_cor: 'Preto',
      veiculo_placa: 'XYZ-1234',
      veiculo_motor: '2.0',
      veiculo_km: 15000,
      id_usuario: 1,
    });

    const result = await veiculoService.remove(1);
    expect(result).toEqual({
      veiculo_id: 1,
      veiculo_marca: 'Toyota',
      veiculo_modelo: 'Corolla',
      veiculo_cor: 'Preto',
      veiculo_placa: 'XYZ-1234',
      veiculo_motor: '2.0',
      veiculo_km: 15000,
      id_usuario: 1,
    });
    expect(prismaService.veiculo.delete).toHaveBeenCalledWith({
      where: { veiculo_id: 1 },
    });
  });
});
