import { UserPartialDto } from "./UserPartial";

export interface PrivateChannelDto {
    id: string
    type: number
    last_message_id: string
    recipients: UserPartialDto[]
}