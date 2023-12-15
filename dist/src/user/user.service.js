"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
const typeorm_2 = require("typeorm");
const Log_1 = require("../entities/Log");
let UserService = class UserService {
    constructor(userRepository, logRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
    }
    findAllUsers() {
        const res = this.userRepository.find();
        return res;
    }
    findOneUser(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    findUserById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async createUser(user) {
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
    updateUser(id, user) {
        return this.userRepository.update(id, user);
    }
    removeUser(id) {
        return this.userRepository.delete(id);
    }
    findProfile(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: { profile: true },
        });
    }
    async findUserLogs(id) {
        const user = await this.findUserById(id);
        return this.logRepository.find({
            where: { user },
            relations: { user: true },
        });
    }
    findLogsByGroup(id) {
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
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Log_1.Log)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map