import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

function GATEWAY_CONNECT(client: Client, { d: data }: Payload) {
    return;
}

export type GATEWAY_CONNECT = typeof GATEWAY_CONNECT;