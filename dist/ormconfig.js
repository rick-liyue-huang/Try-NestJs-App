"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const Log_1 = require("./src/entities/Log");
const Profile_1 = require("./src/entities/Profile");
const Role_1 = require("./src/entities/Role");
const User_1 = require("./src/entities/User");
exports.ormConfig = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3307,
    username: 'root',
    password: 'example',
    database: 'testdb',
    entities: [User_1.User, Profile_1.Profile, Log_1.Log, Role_1.Role],
    synchronize: true,
    logging: false,
};
//# sourceMappingURL=ormconfig.js.map