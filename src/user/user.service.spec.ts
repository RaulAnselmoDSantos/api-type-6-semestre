import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            usuario: {
              findMany: jest.fn().mockResolvedValue([{ id_usuario: 1, nome_usuario: 'Test User' }]), // Mock findMany
              findUnique: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Test User' }), // Mock findUnique
              create: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Created User' }), // Mock create
              update: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Updated User' }), // Mock update
              delete: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Deleted User' }), // Mock delete
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id_usuario: 1, nome_usuario: 'Test User' }]);
    expect(prisma.usuario.findMany).toHaveBeenCalled();
  });

  it('should return a single user by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Test User' });
    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
  });

  it('should create a user', async () => {
    const dto = { 
      nome_usuario: 'New User', 
      email_usuario: 'newuser@email.com', 
      cpf_usuario: '12345678901', 
      senha_usuario: 'password123' 
    };
  
    const expectedData = {
      ...dto,
      tipo_usuario: 1, // Inclua o campo que Prisma adiciona automaticamente
    };
  
    const result = await service.create(dto);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Created User' });
    expect(prisma.usuario.create).toHaveBeenCalledWith({ data: expectedData }); // Atualize o objeto esperado
  });
  
  

  it('should update a user', async () => {
    const dto = { nome_usuario: 'Updated User' };
    const result = await service.update(1, dto);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Updated User' });
    expect(prisma.usuario.update).toHaveBeenCalledWith({ where: { id_usuario: 1 }, data: dto });
  });

  it('should remove a user', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Deleted User' });
    expect(prisma.usuario.delete).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
  });
});
