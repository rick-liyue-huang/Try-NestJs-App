import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { User } from '../entities/User';
export declare class UserController {
    private configService;
    private userService;
    private readonly logger;
    constructor(configService: ConfigService, userService: UserService, logger: LoggerService);
    findAllUsers(): Promise<User[]>;
    createUser(user: User): Promise<User>;
    findOneUser(username: string): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    removeUser(id: number): Promise<import("typeorm").DeleteResult>;
    getUserProfile(id: number): Promise<User>;
    getUserLogs(id: number): Promise<import("../entities/Log").Log[]>;
    getUserLogsByGroup(id: number): Promise<{
        result: any;
        count: number;
    }[]>;
}
