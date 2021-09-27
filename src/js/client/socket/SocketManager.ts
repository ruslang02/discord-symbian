/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultSettings } from "store/Settings";
import { Payload } from "../../structures/dto/Payload";
import { Client } from "../Client";
import { handlers } from "./handlers/index";

export class SocketManager {
    private isBackground = false;

    constructor(private client: Client) { }

    connect() {
        const settings = window.store.get("settings");
        const [host, port] = (settings.proxyUrl || defaultSettings.proxyUrl).split(":");

        socket.connectToServer(host, +port);
    }

    ready() {
        socket.messageReceived.connect(msg => {
            this.isBackground ? this.handleBackgroundMessage(msg) : this.handleMessage(msg);
        });
    }

    send(payload: Payload) {
        const json = JSON.stringify(payload);

        this.client.emit("debug", "Sending payload: " + json);
        socket.send(json);
    }

    setBackground(bg: boolean) {
        this.isBackground = bg;
    }

    private handleBackgroundMessage = (msg: string) => {
        if (msg.indexOf("\"op\":0") !== -1) {
            if (msg.indexOf("\"t\":\"MESSAGE_CREATE\"") !== -1) {
                if (msg.indexOf("\"guild_id\"") === -1 || (
                    this.client.user && (msg.indexOf(this.client.user.id) !== -1)
                )) {
                    this.handleMessage(msg);
                }
            }
        } else {
            this.handleMessage(msg);
        }
    };

    private handleMessage = (msg: string) => {
        try {
            this.client.emit("debug", "Received payload: " + msg);
            this.handlePayload(JSON.parse(msg));
        } catch (e) {
            this.client.emit("error", e);
        }
    };

    private handlePayload(payload: Payload) {
        switch (payload.op) {
            case -1:

            case 0:
                payload.t && handlers[payload.t]?.(this.client, payload as any);
                break;

            case 10:
                handlers.HELLO(this.client, payload as any);
                break;

            case 11:
                handlers.HEARTBEAT_ACK(this.client, payload);
                break;
        }
    }
}
