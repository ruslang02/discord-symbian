import { ClientImplInst } from "../client/Client";
import { UserDto } from "./dto/User";

export interface User extends UserDto {}

const User = class UserImpl implements User {
    email: string | null = null;
    discriminator: string | null = null;
    username: string | null = null;

    constructor(private client: ClientImplInst, dto: UserDto) {
        this._patch(dto);
    }
    _patch(data: UserDto) {
        this.username = data.username ?? null;
        this.discriminator = data.discriminator ?? null;
        this.email = data.email ?? null;
    }
}

export type UserImpl = typeof User;

