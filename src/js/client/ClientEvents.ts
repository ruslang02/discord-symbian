import { MessageDto } from "../structures/dto/Message";

export type ClientEvents = "debug" | "error" | "message" | "ready";

export interface ClientEventCallbackArgs {
    debug: [string]
    error: [Error]
    message: [MessageDto]
    ready: []
}