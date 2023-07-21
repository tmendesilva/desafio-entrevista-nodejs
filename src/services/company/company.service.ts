import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from 'src/dtos/company.dto';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../../entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(data: CompanyDto) {
    return await this.companyRepository.save(data);
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOneByOrFail(id: number) {
    try {
      return await this.companyRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, data: CompanyDto) {
    const company = await this.findOneByOrFail(id);
    this.companyRepository.merge(company, data);
    return await this.companyRepository.save(company);
  }

  async delete(id: number) {
    await this.findOneByOrFail(id);
    await this.companyRepository.softDelete(id);
  }
}
