import { ClientImpl } from "../js/client/Client";
declare const Client: ClientImpl;
Qt.include("../js/client/Client.js");

function handleLoginClick() {
    window.client.login("NTkzODIyODM5Nzc0MjQ4OTk5.YOq5Ig.6EjXP0wMrwdj6kvRrBhIKDctTa4");
}

function handleReady() {
    Object.defineProperty(window, "client", { 
        value: new Client()
    });
    Object.defineProperty(window, "db", {
        value: openDatabaseSync("DiscordDb", "1.0", "Settings store for Discord client.", 100000)
    });
    window.client.ready();
}
