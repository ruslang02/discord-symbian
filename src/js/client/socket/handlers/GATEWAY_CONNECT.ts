import { Payload } from "../../../structures/dto/Payload";
import { ClientImplInst } from "../../Client";

function GATEWAY_CONNECT(client: ClientImplInst, { d: data }: Payload) {
    return;
}

export type GATEWAY_CONNECT = typeof GATEWAY_CONNECT;