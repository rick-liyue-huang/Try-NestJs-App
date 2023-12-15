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
exports.RangeController = void 0;
const common_1 = require("@nestjs/common");
const range_service_1 = require("./range.service");
let RangeController = class RangeController {
    constructor(rangeService) {
        this.rangeService = rangeService;
    }
    getRange(num) {
        if (num === '0') {
            return { result: '0' };
        }
        const result = this.rangeService.getRange(num);
        return { result };
    }
};
exports.RangeController = RangeController;
__decorate([
    (0, common_1.Get)(':num'),
    __param(0, (0, common_1.Param)('num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], RangeController.prototype, "getRange", null);
exports.RangeController = RangeController = __decorate([
    (0, common_1.Controller)('range'),
    __metadata("design:paramtypes", [range_service_1.RangeService])
], RangeController);
//# sourceMappingURL=range.controller.js.map