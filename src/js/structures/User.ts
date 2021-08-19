import { Client } from "../client/Client";
import { UserDto } from "./dto/User";

const User = class User {
    id!: string;
    email?: string;
    discriminator!: string;
    username!: string;
    avatar?: string;

    constructor(private client: Client, dto: UserDto) {
        this._patch(dto);
    }
    _patch(data: UserDto) {
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.id = data.id ?? null;
        this.email = data.email;
        this.avatar = data.avatar;
    }
};

export type UserImpl = typeof User;
export type User = typeof User["prototype"];
