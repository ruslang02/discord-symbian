import { Payload } from "../../../structures/dto/Payload";
import { ClientImplInst } from "../../Client";

function GATEWAY_HELLO(client: ClientImplInst, { d: data }: Payload) {
    client.ws.send({
        op: -1,
        t: "GATEWAY_CONNECT"
    });
}

export type GATEWAY_HELLO = typeof GATEWAY_HELLO;