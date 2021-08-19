import { PrivateChannelDto } from "../PrivateChannel";
import { UserDto } from "../User";

export interface ReadyEventDto {
    user: UserDto
    private_channels: PrivateChannelDto[]
}