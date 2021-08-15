import { DatabaseStore } from "../../js/store/DatabaseStore";
declare const Store: DatabaseStore;
Qt.include("../../js/store/DatabaseStore.js");

declare const dialog: Qml.CommonDialog;
declare const tokenItem: Qml.ListItem;
declare const tokenField: Qml.TextField;
declare const debugModeItem: Qml.SelectionListItem;

function handleReady() {
    dialog.buttonClicked.connect(bi => {
        if (bi === 0) {
            window.store.fetch("settings", settings => {
                settings.token = tokenField.text;
                window.store.set("settings", settings);
                loadSettings();
            });
        }
    });
    tokenItem.clicked.connect(dialog.open);
    debugModeItem.clicked.connect(() => {
        window.store.fetch("settings", settings => {
            settings.debug = !settings.debug;
            window.store.set("settings", settings);
            loadSettings();
        });
    });
    loadSettings();
}

function loadSettings() {
    const settings = window.store.get("settings");

    tokenField.text = settings.token ?? "";
    debugModeItem.subTitle = settings.debug ? "Enabled" : "Disabled";
}