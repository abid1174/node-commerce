import { BaseEntity } from '@app/common/entities';
import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Unique('username', ['username'])
  @Column({ length: 200 })
  username: string;

  @Column('simple-array')
  roles: string[];

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @Column()
  password: string;
}
