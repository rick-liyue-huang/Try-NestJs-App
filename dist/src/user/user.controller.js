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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./user.service");
const User_1 = require("../entities/User");
const nest_winston_1 = require("nest-winston");
let UserController = class UserController {
    constructor(configService, userService, logger) {
        this.configService = configService;
        this.userService = userService;
        this.logger = logger;
        this.logger.log(`UserController created`);
    }
    findAllUsers() {
        const user = { isAdmin: false };
        if (!user.isAdmin) {
            throw new common_1.HttpException('User is not admin, ', common_1.HttpStatus.FORBIDDEN);
        }
        this.logger.log(`findAllUsers()`);
        this.logger.warn(`findAllUsers()`);
        return this.userService.findAllUsers();
    }
    createUser(user) {
        return this.userService.createUser(user);
    }
    findOneUser(username) {
        return this.userService.findOneUser(username);
    }
    updateUser(id, user) {
        return this.userService.updateUser(id, user);
    }
    removeUser(id) {
        return this.userService.removeUser(id);
    }
    getUserProfile(id) {
        return this.userService.findProfile(id);
    }
    getUserLogs(id) {
        return this.userService.findUserLogs(id);
    }
    async getUserLogsByGroup(id) {
        const res = await this.userService.findLogsByGroup(id);
        return res.map((o) => ({
            result: o.result,
            count: parseInt(o.count),
        }));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOneUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('logs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserLogs", null);
__decorate([
    (0, common_1.Get)('logs/group/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserLogsByGroup", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_service_1.UserService, Object])
], UserController);
//# sourceMappingURL=user.controller.js.map