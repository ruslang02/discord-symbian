import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

function GATEWAY_HELLO(client: Client, { d: data }: Payload) {
    client.ws.send({
        op: -1,
        t: "GATEWAY_CONNECT"
    });
}

export type GATEWAY_HELLO = typeof GATEWAY_HELLO;