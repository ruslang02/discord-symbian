import { PrivateChannelDto } from "../structures/dto/PrivateChannel";
import { User } from "../structures/User";
import { SocketManager, SocketManagerImpl } from "./socket/SocketManager";

declare const SocketManager: SocketManagerImpl;
Qt.include("./socket/SocketManager.js");

export interface Client {
    login(token: string): void;
    ready(): void;

    privateChannels: PrivateChannelDto[];
    token: string | null
    user: User | null
}

export type ClientImpl = typeof Client;
export type ClientImplInst = InstanceType<typeof Client>;

const Client = class ClientImpl implements Client {
    constructor() {
        this.ws = new SocketManager(this);
    }
    login(token: string) {
        this.token = token;
        this.ws.connect();
    }
    ready() {
        this.ws.ready();
    }

    privateChannels: PrivateChannelDto[] = []
    token: string | null = null
    user: User | null = null
    ws: SocketManager
}