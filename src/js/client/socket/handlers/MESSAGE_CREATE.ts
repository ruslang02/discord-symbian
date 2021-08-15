import { MessageDto } from "../../../structures/dto/Message";
import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

function MESSAGE_CREATE(client: Client, { d: data }: Payload<MessageDto>) {
    if (!data) return;
    client.emit("message", data);
}

export type MESSAGE_CREATE = typeof MESSAGE_CREATE;