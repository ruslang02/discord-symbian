import { defaultSettings } from "./Settings";

export const schemas = {
    settings: defaultSettings,
} as const;

export type Schemas = typeof schemas;

export type StoreKey = keyof typeof schemas;