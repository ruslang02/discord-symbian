/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const exports: any;

const timers: string[] = [];

const directories = [
    "",
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
] as const;

function require(url: string) {
    for (const dir of directories) {
        if(Qt.include("../" + dir + url + ".js").status === 0) {
            return exports;
        }
    }
}

function handleReady() {
    const component = Qt.createComponent("main.qml");

    component.createObject(global);
}