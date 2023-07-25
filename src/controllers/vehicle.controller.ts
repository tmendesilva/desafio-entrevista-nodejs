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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VehicleDto } from 'src/dtos/vehicle.dto';
import { VehicleService } from 'src/services/vehicle/vehicle.service';

@Controller('vehicle')
@ApiTags('Vehicle')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VehicleController {
  constructor(private service: VehicleService) {}

  @Post()
  async create(@Body() body: VehicleDto) {
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
  async update(@Param('id') id: number, @Body() body: VehicleDto) {
    return await this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}
