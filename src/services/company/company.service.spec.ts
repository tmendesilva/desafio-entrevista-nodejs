import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from '../../entities/company.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import * as cnpj from 'validation-br/dist/cpf';
import { NotFoundException } from '@nestjs/common';

const generateCompany = () => {
  return {
    name: faker.company.name(),
    cnpj: cnpj.fake(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number('## #####-####'),
    car_space_amount: faker.number.int({ min: 10, max: 1000 }),
    motorcycle_space_amount: faker.number.int({ min: 10, max: 1000 }),
  };
};

const companyList: CompanyEntity[] = [
  CompanyEntity.of(generateCompany()),
  CompanyEntity.of(generateCompany()),
  CompanyEntity.of(generateCompany()),
];

const updatedCompany: CompanyEntity = CompanyEntity.of({
  ...companyList[0],
  name: `${companyList[0].name} - 2`,
});

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(companyList),
            findOneByOrFail: jest.fn().mockResolvedValue(companyList[0]),
            create: jest.fn().mockReturnValue(companyList[0]),
            merge: jest.fn().mockReturnValue(updatedCompany),
            save: jest.fn().mockResolvedValue(companyList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<CompanyEntity>>(
      getRepositoryToken(CompanyEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return company list', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(companyList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByOrFail', () => {
    it('should return a company item', async () => {
      // Act
      const result = await service.findOneByOrFail(1);

      // Assert
      expect(result).toEqual(companyList[0]);
      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(service.findOneByOrFail(1)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new company item', async () => {
      // Arrangedepo
      const companyData = generateCompany();

      // Act
      const result = await service.create(companyData);

      // Assert
      expect(result).toEqual(companyList[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a company item', async () => {
      // Arrange
      const updatedData: CompanyEntity = {
        ...companyList[0],
        name: `${companyList[0].name} - 2`,
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedCompany);

      // Act
      const result = await service.update(1, updatedData);

      // Assert
      expect(result).toEqual(updatedCompany);
    });
  });

  describe('delete', () => {
    it('should delete a company successfully', async () => {
      // Act
      const result = await service.delete(1);

      // Assert
      expect(result).toBeUndefined();
      expect(repository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(repository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(repository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(service.delete(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
