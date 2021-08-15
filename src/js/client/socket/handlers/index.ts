import { READY } from "./READY";
declare const READY: READY;
Qt.include("./READY.js");

import { GATEWAY_CONNECT } from "./GATEWAY_CONNECT";
declare const GATEWAY_CONNECT: GATEWAY_CONNECT;
Qt.include("./GATEWAY_CONNECT.js");

import { GATEWAY_HELLO } from "./GATEWAY_HELLO";
declare const GATEWAY_HELLO: GATEWAY_HELLO;
Qt.include("./GATEWAY_HELLO.js");

import { HELLO } from "./HELLO";
declare const HELLO: HELLO;
Qt.include("./HELLO.js");

import { HEARTBEAT_ACK } from "./HEARTBEAT_ACK";
declare const HEARTBEAT_ACK: HEARTBEAT_ACK;
Qt.include("./HEARTBEAT_ACK.js");

import { MESSAGE_CREATE } from "./MESSAGE_CREATE";
declare const MESSAGE_CREATE: MESSAGE_CREATE;
Qt.include("./MESSAGE_CREATE.js");

import { EventName } from "../../../structures/dto/EventName";
import { Client } from "../../Client";
import { Payload } from "../../../structures/dto/Payload";

export type Handler = (client: Client, d: Payload) => void;

const handlers = {
    GATEWAY_CONNECT,
    GATEWAY_HELLO,
    HEARTBEAT_ACK,
    HELLO,
    MESSAGE_CREATE,
    READY
};

export type handlers = Record<EventName, Handler>;