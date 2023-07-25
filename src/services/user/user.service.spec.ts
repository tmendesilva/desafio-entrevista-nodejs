import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';

const generateUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Test@123',
  };
};

const userList: UserEntity[] = [
  UserEntity.of(generateUser()),
  UserEntity.of(generateUser()),
  UserEntity.of(generateUser()),
];

const updatedUser: UserEntity = UserEntity.of({
  ...userList[0],
  name: `${userList[0].name} Abc`,
});

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userList),
            findOneByOrFail: jest.fn().mockResolvedValue(userList[0]),
            create: jest.fn().mockReturnValue(userList[0]),
            merge: jest.fn().mockReturnValue(updatedUser),
            save: jest.fn().mockResolvedValue(userList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
