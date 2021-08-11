import { ReadyEventDto } from "../../../structures/dto/events/Ready";
import { Payload } from "../../../structures/dto/Payload";
import { UserImpl } from "../../../structures/User";
import { ClientImplInst } from "../../Client";

declare const User: UserImpl;
Qt.include("../../../structures/User.js");

function READY(client: ClientImplInst, { d: data }: Payload<ReadyEventDto>) {
    if (!data) return;
    client.user = new User(client, data.user);
    client.privateChannels = data.private_channels;
    console.log("Client ready.");
}

export type READY = typeof READY;