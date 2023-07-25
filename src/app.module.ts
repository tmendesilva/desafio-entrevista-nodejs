import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { AuthModule } from './modules/auth.module';
import { CompanyModule } from './modules/company.module';
import { UserModule } from './modules/user.module';
import { VehicleModule } from './modules/vehicle.module';
import { TicketService } from './services/ticket/ticket.service';
import { TicketModule } from './modules/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(<string>process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.MODE === 'DEV',
    }),
    AppModule,
    UserModule,
    AuthModule,
    CompanyModule,
    VehicleModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
