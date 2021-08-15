import { ReadyEventDto } from "../../../structures/dto/events/Ready";
import { Payload } from "../../../structures/dto/Payload";
import { UserImpl } from "../../../structures/User";
import { Client } from "../../Client";

import { PrivateChannel, PrivateChannelImpl } from "../../../structures/PrivateChannel";
declare const PrivateChannel: PrivateChannelImpl;
Qt.include("../../../structures/PrivateChannel.js");

declare const User: UserImpl;
Qt.include("../../../structures/User.js");

function READY(client: Client, { d: data }: Payload<ReadyEventDto>) {
    if (!data) return;
    client.user = new User(client, data.user);
    data.private_channels.forEach(channel => {
        const [recipient] = channel.recipients;
        client.users[recipient.id] = new User(client, recipient);
        client.privateChannels[channel.id] = new PrivateChannel(client, channel);
    });
    client.emit("ready");
}

export type READY = typeof READY;