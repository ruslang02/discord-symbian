import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

function HEARTBEAT_ACK(client: Client, { d: data }: Payload) {

}

export type HEARTBEAT_ACK = typeof HEARTBEAT_ACK;