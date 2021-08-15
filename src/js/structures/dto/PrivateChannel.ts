import { UserDto } from "./User";

export interface PrivateChannelDto {
    id: string
    type: number
    last_message_id: string
    recipients: UserDto[]
}