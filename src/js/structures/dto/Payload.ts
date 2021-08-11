import { EventName } from "./EventName";

export type Payload<T = any> = {
    op: number,
    d?: T | null,
    s?: number | null,
    t?: EventName | null
}