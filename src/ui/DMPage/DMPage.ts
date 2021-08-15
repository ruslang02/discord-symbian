import { User } from "../../js/structures/User";
import { defineTimers } from "../timer";
declare const defineTimers: defineTimers;
Qt.include("../timer.js");

type DmListItem = {
    id: string;
    userId: string;
    userAvatar?: string;
    userName: string;
    userDiscriminator: string;
};

declare const dmListModel: Qml.ListModel<DmListItem>;
declare const dmPage: Qml.Page & Qml.Component & Qml.WithTimers
declare const dmListItem: Qml.ListItem;

function handleReady() {
    defineTimers(dmPage);
    dmPage.setTimeout(() => {
        window.client.on("ready", loadChannels);
    });
}

function openMessages(channelId: string) {
    window.pageStack.push(
        Qt.resolvedUrl("../MessagesPage/MessagesPage.qml"),
        {
            channelId,
            channelName: "@" + window.client.privateChannels[channelId].recipients[0].username
        }
    );
}

function loadChannels() {
    dmListModel.clear();
    const channels = Object.keys(window.client.privateChannels)
        .filter(a => window.client.privateChannels[a].lastMessageId)
        .sort((a, b) => {
            const ac = window.client.privateChannels[a];
            const bc = window.client.privateChannels[b];
            return ac.lastMessageId.localeCompare(bc.lastMessageId);
        }).reverse();
    channels.forEach(channelId => {
        const channel = window.client.privateChannels[channelId];
        const [recipient] = channel.recipients;
        const item = {
            id: channelId,
            userId: recipient.id,
            userAvatar: recipient.avatar,
            userName: recipient.username,
            userDiscriminator: recipient.discriminator
        };
        dmListModel.append(item);
    })
}