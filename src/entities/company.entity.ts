import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('company')
export class CompanyEntity extends BaseEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column('int')
  car_space_amount: number;

  @Column('int')
  motorcycle_space_amount: number;

  public static of(params: Partial<CompanyEntity>): CompanyEntity {
    const company = new CompanyEntity();
    Object.assign(company, params);
    return company;
  }
}
