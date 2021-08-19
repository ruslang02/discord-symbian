import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

type HelloData = {
    heartbeat_interval: number
};

function HELLO(client: Client, { d: data }: Payload<HelloData>) {
    if (!data) {
        throw new Error("No data provided to the handler.");
    }

    client.ws.send({
        op: 2,
        d: {
            token: client.token,
            capabilities: 1,
            properties: {
                "$os": "Symbian^3",
                "$browser": "discord-symbian",
                "$device": "Nokia E7-00",
            },
        },
    });

    window.setInterval(() => {
        client.ws.send({
            op: 1,
            d: null,
        });
    }, data.heartbeat_interval);
}

export type HELLO = typeof HELLO;