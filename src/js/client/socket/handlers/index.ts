import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";
import { GATEWAY_CONNECT } from "./GATEWAY_CONNECT";
import { GATEWAY_HELLO } from "./GATEWAY_HELLO";
import { HEARTBEAT_ACK } from "./HEARTBEAT_ACK";
import { HELLO } from "./HELLO";
import { MESSAGE_CREATE } from "./MESSAGE_CREATE";
import { READY } from "./READY";

export type Handler = (client: Client, d: Payload) => void;

export const handlers = {
    GATEWAY_CONNECT,
    GATEWAY_HELLO,
    GATEWAY_UPDATE_SUPPORTED_EVENTS: () => { /**/ },
    HEARTBEAT_ACK,
    HELLO,
    MESSAGE_CREATE,
    READY,
};