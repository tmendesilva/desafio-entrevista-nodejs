import { BeforeInsert, Column, Entity } from 'typeorm';
import { hashSync } from 'bcrypt';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  public static of(params: Partial<UserEntity>): UserEntity {
    const user = new UserEntity();
    Object.assign(user, params);
    return user;
  }
}
