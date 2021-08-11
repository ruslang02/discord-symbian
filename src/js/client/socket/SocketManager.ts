import { Payload } from "../../structures/dto/Payload";
import { Client, ClientImplInst } from "../Client";

import { handlers } from "./handlers";
declare const handlers: handlers;
Qt.include("./handlers/index.js");

export interface SocketManager {
    connect(): void;
    ready(): void;
    send(payload: Payload): void;
}

export type SocketManagerImpl = typeof SocketManager;

const SocketManager = class SocketManagerImpl {
    constructor(private client: ClientImplInst) {}

    connect() {
        socket.connectToServer();
    }
    private handlePayload(payload: Payload) {
        switch(payload.op) {
            case -1:
            case 0:
                payload.t && handlers[payload.t]?.(this.client, payload);
                break;
            case 10:
                handlers.HELLO(this.client, payload);
                break;
        }
    }
    ready() {
       socket.messageReceived.connect((msg: string) => {
            try {
                // console.log("Received payload", msg)
                this.handlePayload(JSON.parse(msg));
            } catch (e) {
                console.log(e);
            }
        });
    }
    send(payload: Payload) {
        const json = JSON.stringify(payload);
        console.log("Sending payload", json)
        socket.send(json);
    }
};