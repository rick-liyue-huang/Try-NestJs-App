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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Log_1 = require("./Log");
const Profile_1 = require("./Profile");
const Role_1 = require("./Role");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'username', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'password', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Log_1.Log, (log) => log.user),
    __metadata("design:type", Array)
], User.prototype, "logs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile_1.Profile, (profile) => profile.user),
    __metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Role_1.Role, (role) => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'user_role',
        joinColumns: [{ name: 'userId', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'roleId', referencedColumnName: 'id' }],
        schema: 'testdb',
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('user', { schema: 'testdb' })
], User);
//# sourceMappingURL=User.js.map