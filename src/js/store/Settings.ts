const defaultSettings = {
    token: undefined,
    debug: false,
    autoConnect: false
};

export type defaultSettings = Settings;

export type Settings = {
    token: string,
    debug: boolean,
    autoConnect: boolean
};