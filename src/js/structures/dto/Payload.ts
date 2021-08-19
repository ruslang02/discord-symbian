import { EventName } from "./EventName";

export type Payload<T = unknown> = {
    op: number
    d?: T | null
    s?: number | null
    t?: EventName | null
};