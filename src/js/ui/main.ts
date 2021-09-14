import { Client } from "client/Client";
import { DatabaseStore } from "store/DatabaseStore";

declare const backButton: Qml.ToolButton;
declare const loginButton: Qml.ToolButton;
declare const settingsButton: Qml.ToolButton;
declare const menuButton: Qml.ToolButton;
declare const minimizeButton: Qml.ToolButton;
declare const menu: Qml.Menu;
declare const banner: Qml.InfoBanner;
declare const symbian: Qml.Symbian;
declare const hapticsEffect: Qml.HapticsEffect;

function loadGlobalScope() {
    Object.defineProperty(global, "client", {
        value: new Client(),
    });

    Object.defineProperty(global, "store", {
        value: new DatabaseStore(),
    });
}

function handleReady() {
    loadGlobalScope();

    symbian.foregroundChanged.connect(() => {
        console.log(symbian.foreground);
        global.client.setBackground(!symbian.foreground);
    });

    backButton.clicked.connect(() => {
        Qt.quit();
    });

    loginButton.clicked.connect(() => {
        const settings = global.store.get("settings");

        if (settings.token) {
            global.client.login(settings.token);
        } else {
            banner.text = "You need to provide a token in order to sign in.";
            banner.open();
        }
    });

    settingsButton.clicked.connect(() => {
        window.pageStack.push(
            Qt.resolvedUrl("SettingsPage/SettingsPage.qml")
        );
    });

    menuButton.clicked.connect(() => {
        menu.open();
    });

    minimizeButton.clicked.connect(() => {
        avkon.minimize();
    });

    global.client.on("ready", () => {
        console.log("Connected to Discord.");
    });

    global.client.on("debug", msg => {
        if (global.store.get("settings").debug) {
            console.log("[Socket DEBUG]", msg);
        }
    });

    global.client.on("message", msg => {
        if (msg.author.id !== global.client.user!.id
            && (!msg.guild_id || msg.mentions.some(m => m.id === global.client.user!.id))
        ) {
            if (symbian.foreground) {
                banner.text = `<b>${msg.author.username}</b><br />${msg.content}`;
                banner.open();
                hapticsEffect.running = true;
            } else {
                avkon.showPopup(msg.author.username, msg.content);

                hapticsEffect.running = true;
                setTimeout(() => { hapticsEffect.running = true; }, 500);
            }
        }
    });

    global.client.ready();
}
