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
exports.Log = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Log = class Log {
};
exports.Log = Log;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Log.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'path', length: 255 }),
    __metadata("design:type", String)
], Log.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'method', length: 255 }),
    __metadata("design:type", String)
], Log.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'data', length: 255 }),
    __metadata("design:type", String)
], Log.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'result', length: 255 }),
    __metadata("design:type", String)
], Log.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.logs, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", User_1.User)
], Log.prototype, "user", void 0);
exports.Log = Log = __decorate([
    (0, typeorm_1.Entity)('log', { schema: 'testdb' })
], Log);
//# sourceMappingURL=Log.js.map