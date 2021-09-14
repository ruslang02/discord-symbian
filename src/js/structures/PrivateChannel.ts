import { Client } from "../client/Client";
import { PrivateChannelDto } from "./dto/PrivateChannel";

export class PrivateChannel {
    id!: string;
    type!: number;
    lastMessageId!: string;
    private recipientIds: string[] = [];

    constructor(private client: Client, dto: PrivateChannelDto) {
        this._patch(dto);
    }

    private _patch(data: PrivateChannelDto) {
        this.id = data.id;
        this.type = data.type;
        this.lastMessageId = data.last_message_id;
        this.recipientIds = data.recipients.map(r => r.id);
    }

    get recipients() {
        const recipients = this.recipientIds.map(id => this.client.users[id]);

        return recipients;
    }
}
