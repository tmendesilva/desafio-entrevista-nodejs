import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../../entities/company.entity';
import { CompanySchema } from 'src/schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(data: CompanySchema) {
    return await this.companyRepository.save(data);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOneOrFail(id: number) {
    try {
      return await this.companyRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: CompanySchema) {
    const company = await this.findOneOrFail(id);
    this.companyRepository.merge(company, data);
    return await this.companyRepository.save(company);
  }

  async delete(id: number) {
    await this.findOneOrFail(id);
    await this.companyRepository.softDelete(id);
  }
}
