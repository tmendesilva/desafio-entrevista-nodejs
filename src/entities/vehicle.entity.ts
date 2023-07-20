import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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

  public static of(params: Partial<VehicleEntity>): VehicleEntity {
    const vehicle = new VehicleEntity();
    Object.assign(vehicle, params);
    return vehicle;
  }
}
