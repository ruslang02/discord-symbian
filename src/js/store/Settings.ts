export const defaultSettings: Settings = {
    token: "",
    debug: false,
    autoConnect: false,
    cdnProxyUrl: "discord.ruzik.xyz",
    proxyUrl: "discord.ruzik.xyz:8471",
};

export type Settings = {
    token: string
    debug: boolean
    autoConnect: boolean
    cdnProxyUrl: string
    proxyUrl: string
};