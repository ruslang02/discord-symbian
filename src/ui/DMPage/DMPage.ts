import { User } from "../../js/structures/User";
import { defineTimers } from "../timer";
declare const defineTimers: defineTimers;
Qt.include("../timer.js");

type DmListItem = {
    id: string;
    recipient: User;
};

declare const dmListModel: Qml.ListModel<DmListItem>;
declare const dmPage: Qml.Page & Qml.Component & Qml.WithTimers
declare const userItem: Qml.ListItem;

function handleReady() {
    defineTimers(dmPage);
    dmPage.setTimeout(() => {
        window.client.on("ready", loadChannels);
    });
}

function openMessages(item: DmListItem) {
    window.pageStack.push(
        Qt.resolvedUrl("../MessagesPage/MessagesPage.qml"),
        {
            channelId: item.id,
            channelName: "@" + window.client.users[item.recipient.id].username
        }
    );
}

function loadChannels() {
    dmListModel.clear();
    Object.keys(window.client.privateChannels).forEach(channelId => {
        const channel = window.client.privateChannels[channelId];
        const [recipient] = channel.recipients;
        dmListModel.append({
            id: channel.id,
            recipient
        });
    })
}