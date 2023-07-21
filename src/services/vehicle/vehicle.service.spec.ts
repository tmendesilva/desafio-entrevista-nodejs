import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleEntity } from '../../entities/vehicle.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

const generateVehicle = () => {
  return {
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    color: faker.color.human(),
    plate: faker.vehicle.vrm(),
    type: faker.vehicle.type(),
  };
};

const vehicleList: VehicleEntity[] = [
  VehicleEntity.of(generateVehicle()),
  VehicleEntity.of(generateVehicle()),
  VehicleEntity.of(generateVehicle()),
];

const updatedVehicle: VehicleEntity = VehicleEntity.of({
  ...vehicleList[0],
  plate: `${vehicleList[0].plate}ABC`,
});

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: Repository<VehicleEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(VehicleEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(vehicleList),
            findOneByOrFail: jest.fn().mockResolvedValue(vehicleList[0]),
            create: jest.fn().mockReturnValue(vehicleList[0]),
            merge: jest.fn().mockReturnValue(updatedVehicle),
            save: jest.fn().mockResolvedValue(vehicleList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    repository = module.get<Repository<VehicleEntity>>(
      getRepositoryToken(VehicleEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return vehicle list', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(vehicleList);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByOrFail', () => {
    it('should return a vehicle item', async () => {
      // Act
      const result = await service.findOneByOrFail(1);

      // Assert
      expect(result).toEqual(vehicleList[0]);
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
    it('should create a new vehicle', async () => {
      // Arrangedepo
      const vehicleData = generateVehicle();

      // Act
      const result = await service.create(vehicleData);

      // Assert
      expect(result).toEqual(vehicleList[0]);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a vehicle item', async () => {
      // Arrange
      const updatedData: VehicleEntity = {
        ...vehicleList[0],
        plate: `${vehicleList[0].plate}ABC`,
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedVehicle);

      // Act
      const result = await service.update(1, updatedData);

      // Assert
      expect(result).toEqual(updatedVehicle);
    });
  });

  describe('delete', () => {
    it('should delete a vehicle successfully', async () => {
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
