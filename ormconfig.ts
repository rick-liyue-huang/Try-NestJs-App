import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Log } from 'src/entities/Log';
import { Profile } from 'src/entities/Profile';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';

export const ormConfig = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3307,
  username: 'root',
  password: 'example',
  database: 'testdb',
  entities: [User, Profile, Log, Role],
  synchronize: true,
  logging: false,
} as TypeOrmModuleOptions;
