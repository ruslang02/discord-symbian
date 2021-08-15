import { ClientImpl } from "../js/client/Client";
declare const Client: ClientImpl;
Qt.include("../js/client/Client.js");

import { DatabaseStore } from "../js/store/DatabaseStore";
declare const Store: DatabaseStore;
Qt.include("../js/store/DatabaseStore.js");

import { defineTimers } from "./timer";
declare const defineTimers: defineTimers;
Qt.include("./timer.js");

declare const backButton: Qml.ToolButton;
declare const loginButton: Qml.ToolButton;
declare const settingsButton: Qml.ToolButton;
declare const banner: Qml.InfoBanner;
declare const symbian: Qml.Symbian;

function loadGlobalScope() {
    Object.defineProperty(window, "store", {
        value: new Store()
    });

    Object.defineProperty(window, "client", {
        value: new Client()
    });

    defineTimers(window);
}

function handleReady() {
    loadGlobalScope();

    backButton.clicked.connect(() => {
        window.pageStack.depth <= 1 ? Qt.quit() : window.pageStack.pop()
    });

    loginButton.clicked.connect(() => {
        const settings = window.store.get("settings");
        if (settings.token) {
            window.client.login(settings.token);
        } else {
            banner.text = "You need to provide a token in order to sign in.";
            banner.open();
        }
    });

    settingsButton.clicked.connect(() => {
        window.pageStack.push(
            Qt.resolvedUrl("SettingsPage/SettingsPage.qml")
        );
    })
    window.client.on("ready", () => {
        // console.log("Connected to Discord.");
    });
    window.client.on("debug", msg => {
        if (window.store.get("settings").debug) {
            console.log("[Socket DEBUG]", msg)
        }
    });
    window.client.on("message", msg => {
        if ((!msg.guild_id || msg.mentions.some(m => m.id === window.client.user?.id)) && msg.author.id !== window.client.user?.id) {
            if (symbian.foreground) {
                banner.text = "<b>" + msg.author.username + "</b><br />" + msg.content;
                banner.open();
            } else {
                avkon.showPopup(msg.author.username, msg.content);
            }
        }
    })
    window.client.ready();
}
