import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

export function HEARTBEAT_ACK(client: Client, { d: data }: Payload) {
    return null;
}