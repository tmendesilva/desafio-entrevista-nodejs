import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TicketEntity } from './ticket.entity';

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

  @OneToMany(() => TicketEntity, (ticket) => ticket.company)
  tickets: TicketEntity[];

  public static of(params: Partial<CompanyEntity>): CompanyEntity {
    const company = new CompanyEntity();
    Object.assign(company, params);
    return company;
  }
}
