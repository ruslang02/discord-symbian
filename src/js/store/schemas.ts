import { defaultSettings } from "./Settings";
declare const defaultSettings: defaultSettings;
Qt.include("./Settings.js");

const schemas = {
    settings: defaultSettings,
} as const;

export type schemas = typeof schemas;

export type StoreKey = keyof typeof schemas;