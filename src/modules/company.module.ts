import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '../controllers/company.controller';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyService } from '../services/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
