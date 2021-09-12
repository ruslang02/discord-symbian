import { Settings } from "../../js/store/Settings";

declare const dialog: Qml.CommonDialog;
declare const tokenItem: Qml.ListItem;
declare const cdnProxyUrlItem: Qml.ListItem;
declare const proxyUrlItem: Qml.ListItem;
declare const dialogField: Qml.TextField;
declare const debugModeItem: Qml.SelectionListItem;

function loadSettings() {
    const settings = window.store.get("settings");

    debugModeItem.subTitle = settings.debug ? "Enabled" : "Disabled";
}

function handleReady() {
    let property: keyof Settings = "token";

    dialog.buttonClicked.connect(bi => {
        if (bi === 0) {
            window.store.fetch("settings", settings => {
                // @ts-ignore
                settings[property] = dialogField.text;
                window.store.set("settings", settings);
                loadSettings();
            });
        }
    });

    tokenItem.clicked.connect(() => {
        dialog.titleText = "Token";
        dialogField.text = window.store.get("settings").token ?? "";
        dialogField.placeholderText = "";
        property = "token";
        dialog.open();
    });

    cdnProxyUrlItem.clicked.connect(() => {
        dialog.titleText = "CDN proxy URL";
        dialogField.text = window.store.get("settings").cdnProxyUrl ?? "";
        dialogField.placeholderText = "hostname:port";
        property = "cdnProxyUrl";
        dialog.open();
    });

    proxyUrlItem.clicked.connect(() => {
        dialog.titleText = "Gateway proxy URL";
        dialogField.text = window.store.get("settings").proxyUrl ?? "";
        dialogField.placeholderText = "hostname:port";
        property = "proxyUrl";
        dialog.open();
    });

    debugModeItem.clicked.connect(() => {
        window.store.fetch("settings", settings => {
            settings.debug = !settings.debug;
            window.store.set("settings", settings);
            loadSettings();
        });
    });

    loadSettings();
}