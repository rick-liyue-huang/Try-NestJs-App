import { Log } from './Log';
import { Profile } from './Profile';
import { Role } from './Role';
export declare class User {
    id: number;
    username: string;
    password: string;
    logs: Log[];
    profile: Profile;
    roles: Role[];
}
