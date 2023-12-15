import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  //Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { User } from '../entities/User';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    // private logger: Logger,
    // @Inject(Logger) private readonly logger: LoggerService,
    // private readonly logger: Logger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log(`UserController created`);
  }

  @Get()
  findAllUsers() {
    const user = { isAdmin: false };
    if (!user.isAdmin) {
      throw new HttpException('User is not admin, ', HttpStatus.FORBIDDEN);
    }
    this.logger.log(`findAllUsers()`); // pino default to info level
    this.logger.warn(`findAllUsers()`); // pino default to info level
    return this.userService.findAllUsers();
  }

  @Post()
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get(':username')
  findOneUser(@Param('username') username: string) {
    return this.userService.findOneUser(username);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: Partial<User>) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.removeUser(id);
  }

  @Get('profile/:id')
  getUserProfile(@Param('id') id: number) {
    return this.userService.findProfile(id);
  }

  @Get('logs/:id')
  getUserLogs(@Param('id') id: number) {
    return this.userService.findUserLogs(id);
  }

  @Get('logs/group/:id')
  async getUserLogsByGroup(@Param('id') id: number) {
    const res = await this.userService.findLogsByGroup(id);
    return res.map((o) => ({
      result: o.result,
      count: parseInt(o.count),
    }));
  }
}
