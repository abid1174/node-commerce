import { BaseEntity } from '@app/common/entities';
import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Unique('username', ['username'])
  @Column({ length: 100 })
  username: string;

  @Unique('email', ['email'])
  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  // @Column('simple-array')
  // roles: string[];

  @Column({ default: false })
  isAccountDisabled: boolean;
}
