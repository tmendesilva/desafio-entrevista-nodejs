import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TicketEntity } from './ticket.entity';

@Entity('vehicle')
export class VehicleEntity extends BaseEntity {
  @Column({ length: 150 })
  brand: string;

  @Column({ length: 150 })
  model: string;

  @Column({ length: 50 })
  color: string;

  @Column({ length: 20 })
  plate: string;

  @Column({ length: 30 })
  type: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.vehicle)
  tickets: TicketEntity[];

  public static of(params: Partial<VehicleEntity>): VehicleEntity {
    const vehicle = new VehicleEntity();
    Object.assign(vehicle, params);
    return vehicle;
  }
}
