import { PrivateChannel } from "structures/PrivateChannel";

type DmListItem = {
    id: string
    userId: string
    userAvatar?: string
    userName: string
    userDiscriminator: string
};

declare const dmListModel: Qml.ListModel<DmListItem>;
declare const dmPage: Qml.Page & Qml.Component;

function loadChannels() {
    dmListModel.clear();
    const { cdnProxyUrl } = global.store.get("settings");
    const channels = Object.keys(global.client.privateChannels)
        .filter(a => global.client.privateChannels[a].lastMessageId)
        .sort((a, b) => {
            const ac = global.client.privateChannels[a];
            const bc = global.client.privateChannels[b];

            return ac.lastMessageId.localeCompare(bc.lastMessageId);
        }).reverse();

    channels.length = 50;
    channels.forEach(channelId => {
        const channel: PrivateChannel = global.client.privateChannels[channelId];
        const [recipient] = channel.recipients;
        const item = {
            id: channelId,
            userId: recipient.id,
            userAvatar: `http://${cdnProxyUrl}/avatars/${recipient.id}/${recipient.avatar}.jpg?size=40`,
            userName: recipient.username,
            userDiscriminator: recipient.discriminator,
        };

        dmListModel.append(item);
    });
}

function handleReady() {
    setTimeout(() => {
        global.client.on("ready", loadChannels);
    });
}

function openMessages(channelId: string) {
    window.pageStack.push(
        Qt.resolvedUrl("../MessagesPage/MessagesPage.qml"),
        {
            channelId,
            channelName: "@" + global.client.privateChannels[channelId].recipients[0].username,
        }
    );
}