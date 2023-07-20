import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { CompanyModule } from './modules/company.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleService } from './services/vehicle/vehicle.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.MODE === 'DEV',
    }),
    AppModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService, VehicleService],
})
export class AppModule {}
