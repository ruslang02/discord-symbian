import { Payload } from "../../structures/dto/Payload";
import { Client } from "../Client";

import { handlers } from "./handlers";
declare const handlers: handlers;
Qt.include("./handlers/index.js");

const SocketManager = class SocketManager {
    constructor(private client: Client) { }

    connect() {
        socket.connectToServer();
    }

    ready() {
        socket.messageReceived.connect((msg: string) => {
            try {
                this.client.emit("debug", "Received payload: " + msg);
                this.handlePayload(JSON.parse(msg));
            } catch (e) {
                this.client.emit("error", e);
            }
        });
    }

    send(payload: Payload) {
        const json = JSON.stringify(payload);
        this.client.emit("debug", "Sending payload: " + json);
        socket.send(json);
    }

    private handlePayload(payload: Payload) {
        switch (payload.op) {
            case -1:
            case 0:
                payload.t && handlers[payload.t]?.(this.client, payload);
                break;
            case 10:
                handlers.HELLO(this.client, payload);
                break;
            case 11:
                handlers.HEARTBEAT_ACK(this.client, payload);
                break;
        }
    }
};

export type SocketManager = typeof SocketManager["prototype"];
export type SocketManagerImpl = typeof SocketManager;