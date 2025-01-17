import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id_usuario: 1, nome_usuario: 'Test User' }]), // Mock findAll
            findOne: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Test User' }), // Mock findOne
            create: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Created User' }), // Mock create
            update: jest.fn().mockResolvedValue({ id_usuario: 1, nome_usuario: 'Updated User' }), // Mock update
            remove: jest.fn().mockResolvedValue({ message: 'User removed successfully' }), // Mock remove
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id_usuario: 1, nome_usuario: 'Test User' }]);
    expect(service.findAll).toHaveBeenCalled(); // Verifica se o método findAll foi chamado
  });

  it('should return a single user by ID', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Test User' });
    expect(service.findOne).toHaveBeenCalledWith(1); // Verifica se o método findOne foi chamado com o ID correto
  });

  it('should create a user', async () => {
    const dto = { 
      nome_usuario: 'New User', 
      email_usuario: 'newuser@email.com', 
      cpf_usuario: '12345678901', // Adicionando campo obrigatório
      senha_usuario: 'password123' // Adicionando campo obrigatório
    };
    const result = await controller.create(dto);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Created User' });
    expect(service.create).toHaveBeenCalledWith(dto); // Verifica se o método create foi chamado com os dados corretos
  });
  

  it('should update a user', async () => {
    const dto = { nome_usuario: 'Updated User' };
    const result = await controller.update('1', dto);
    expect(result).toEqual({ id_usuario: 1, nome_usuario: 'Updated User' });
    expect(service.update).toHaveBeenCalledWith(1, dto); // Verifica se o método update foi chamado corretamente
  });

  it('should remove a user', async () => {
    const result = await controller.remove('1', { algumOutroParametro: 'valor' });
    expect(result).toEqual({ message: 'User removed successfully' });
    expect(service.remove).toHaveBeenCalledWith(1, { algumOutroParametro: 'valor' }); // Verifica se o método remove foi chamado corretamente
  });
});
