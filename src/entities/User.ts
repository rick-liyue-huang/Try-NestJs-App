import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Log } from './Log';
import { Profile } from './Profile';
import { Role } from './Role';

@Entity('user', { schema: 'testdb' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'username', length: 255 })
  username: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'userId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'id' }],
    schema: 'testdb',
  })
  roles: Role[];
}
