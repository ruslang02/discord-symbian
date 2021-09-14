import { MessageDto } from "../../../structures/dto/Message";
import { Payload } from "../../../structures/dto/Payload";
import { Client } from "../../Client";

export function MESSAGE_CREATE(client: Client, { d: data }: Payload<MessageDto>) {
    if (!data) return;
    client.emit("message", data);
}