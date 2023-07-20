import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from '../services/company/company.service';
import { CompanySchema } from '../schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post()
  async create(@Body() body: CompanySchema) {
    return await this.service.create(body);
  }

  @Get()
  public async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return await this.service.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CompanySchema) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
