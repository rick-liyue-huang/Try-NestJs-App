import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Log } from '../entities/Log';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
