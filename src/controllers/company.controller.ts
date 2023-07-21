import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompanyDto } from '../dtos/company.dto';
import { CompanyService } from '../services/company/company.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Post()
  async create(@Body() body: CompanyDto) {
    return await this.service.create(body);
  }

  @Get()
  public async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return await this.service.findOneByOrFail(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CompanyDto) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
