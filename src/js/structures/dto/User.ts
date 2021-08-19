export interface UserDto {
    id: string
    email?: string
    discriminator: string
    username: string
    avatar?: string
    public_flags?: number
}