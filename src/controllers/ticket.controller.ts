import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketDto } from 'src/dtos/ticket.dto';
import { TicketService } from 'src/services/ticket/ticket.service';

@Controller('ticket')
@ApiTags('Ticket')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TicketController {
  constructor(private service: TicketService) {}

  @Post()
  async create(@Body() body: TicketDto) {
    return await this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number) {
    return await this.service.exit(id);
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }
}
