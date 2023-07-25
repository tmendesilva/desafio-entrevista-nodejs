import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { VehicleEntity } from './vehicle.entity';
import { CompanyEntity } from './company.entity';

@Entity('ticket')
export class TicketEntity extends BaseEntity {
  @Column('int')
  vehicle_id: number;

  @Column('int')
  company_id: number;

  @Column()
  datetime_entry: Date;

  @Column({ default: null })
  datetime_exit: Date;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.tickets)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.tickets)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
