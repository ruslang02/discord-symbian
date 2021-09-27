/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let module: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let exports: any;

const timers: string[] = [];

const directories = [
    "",
    "../",
    "ui/",
    "ui/DMPage/",
    "utils/",
    "client/",
    "client/http/",
    "client/socket/",
    "client/socket/handlers/",
    "store/",
    "structures/",
    "structures/dto/",
    "structures/dto/events/",
    "../discord.js/",
    "../discord.js/client/",
    "../discord.js/sharding/",
    "../discord.js/structures/",
    "../discord.js/util/",
] as const;

function require(url: string) {
    for (const dir of directories) {
        const modulePath = "../" + dir + url + ".js";
        const result = Qt.include(modulePath);

        if(result.status === 0) {
            console.log(`Loaded module "${modulePath}"`);

            return exports;
        } else if (result.status !== 2) {
            // @ts-ignore
            console.log(`Could not load module "${modulePath}", error code ${result.status}. ${result.exception}`);
        }
    }

    for (const dir of directories) {
        const modulePath = "../" + dir + url + "/index.js";
        const result = Qt.include(modulePath);

        if(result.status === 0) {
            console.log(`Loaded module "${modulePath}"`);

            return exports;
        } else if (result.status !== 2) {
            // @ts-ignore
            console.log(`Could not load module "${modulePath}", error code ${result.status}. ${result.exception}`);
        }
    }

    throw new Error(`Could not load module "${url}"`);
}

function handleReady() {
    Object.defineProperty(module, "exports", {
        get() { return exports; },
        set(v) {
            exports = v;
        },
    });

    const component = Qt.createComponent("main.qml");

    component.createObject(window);
}