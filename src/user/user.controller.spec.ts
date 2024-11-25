import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let userModel: typeof User

  beforeEach(async () => {
    const mockUserModel = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    };
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    userModel = module.get<typeof User>(getModelToken(User));
  });

  describe('findAll', () => {
    it('Should return the standard API format', async () => {
      const mockUsers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          type: 'user',
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          type: 'admin',
        },
      ];

      const expectedResponse = {
        message: 'Successfully fetched users',
        data: {
          users: [
            {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              is_admin: false,
            },
            {
              id: 2,
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              is_admin: true,
            },
          ],
        },
      };

      jest.spyOn(userModel, 'findAll').mockResolvedValue(mockUsers as any);

      expect(await controller.findAll()).toEqual(mockUsers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
