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

import { EventName } from "../../../structures/dto/EventName";
import { ClientImplInst } from "../../Client";
import { Payload } from "../../../structures/dto/Payload";

export type Handler = (client: ClientImplInst, d: Payload) => void;

const handlers = {
    GATEWAY_CONNECT,
    GATEWAY_HELLO,
    HELLO,
    READY
};

export type handlers = Record<EventName, Handler>;