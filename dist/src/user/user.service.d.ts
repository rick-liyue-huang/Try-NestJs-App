import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { Log } from '../entities/Log';
export declare class UserService {
    private readonly userRepository;
    private readonly logRepository;
    constructor(userRepository: Repository<User>, logRepository: Repository<Log>);
    findAllUsers(): Promise<User[]>;
    findOneUser(username: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    removeUser(id: number): Promise<import("typeorm").DeleteResult>;
    findProfile(id: number): Promise<User>;
    findUserLogs(id: number): Promise<Log[]>;
    findLogsByGroup(id: number): Promise<any[]>;
}
