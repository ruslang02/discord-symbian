import { Payload } from "../../../structures/dto/Payload";
import { ClientImplInst } from "../../Client";

function HELLO(client: ClientImplInst, { d: data }: Payload) {
    client.ws.send({
        op: 2,
        d: {
            token: client.token,
            properties: {
                "$os": "Symbian^3",
                "$browser": "discord-symbian",
                "$device": "Nokia E7-00"
            }
        }
    });
}

export type HELLO = typeof HELLO;