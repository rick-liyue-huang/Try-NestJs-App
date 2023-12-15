import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { Log } from '../entities/Log';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // match with the forFeature() method in user.module.ts
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
  ) {}

  findAllUsers() {
    const res = this.userRepository.find();
    return res;
  }

  findOneUser(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(user: User) {
    const newUser = await this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  removeUser(id: number) {
    return this.userRepository.delete(id);
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  async findUserLogs(id: number) {
    const user = await this.findUserById(id);
    return this.logRepository.find({
      where: { user },
      relations: { user: true },
    });
  }

  findLogsByGroup(id: number) {
    return this.logRepository
      .createQueryBuilder('log')
      .select('log.result', 'result')
      .addSelect('COUNT(log.result)', 'count')
      .leftJoinAndSelect('log.user', 'user')
      .where('log.userId = :id', { id })
      .groupBy('log.result')
      .orderBy('log.result', 'DESC')
      .orderBy('count', 'ASC')
      .offset(1)
      .limit(2)
      .getRawMany();

    // return this.logRepository.query('SELECT * FROM log'); // also can use original sql query
  }
}
