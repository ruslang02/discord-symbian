import { Http } from "../../js/client/http/Http";
import { MessageDto } from "../../js/structures/dto/Message";
declare const Http: Http;
Qt.include("../../js/client/http/Http.js");

import { defineTimers } from "../timer";
declare const defineTimers: defineTimers;
Qt.include("../timer.js");

import { markdown } from "../../js/utils/drawdown";
declare const markdown: markdown;
Qt.include("../../js/utils/drawdown.js");

declare const msgPage: Qml.Page & Qml.WithTimers & { channelId?: string };
declare const msgListModel: Qml.ListModel;
declare const msgListView: Qml.ListView;
declare const sendButton: Qml.ToolButton;
declare const inputField: Qml.TextArea;

const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;

function sendMessage(content: string) {
    inputField.text = "";
    Http.request<MessageDto[]>({
        method: "POST",
        path: `https://discord.com/api/v9/channels/${msgPage.channelId}/messages`,
        body: JSON.stringify({ content }),
    }, (err, messages) => null);
}

function appendMessage(msg: MessageDto) {
    const { cdnProxyUrl } = window.store.get("settings");
    const splitTimestamp = msg.timestamp.split("T");
    const [year, month, day] = splitTimestamp[0].split("-");
    const [hour, minute, second] = splitTimestamp[1].split(".")[0].split(":");
    const date = new Date(+year, (+month) - 1, +day, +hour, +minute, +second);

    const attachments = msg.attachments
        .map(_ => _.url)
        .map(url => url.replace("https://cdn.discordapp.com", `http://${cdnProxyUrl}`));

    msgListModel.append({
        username: msg.author.username,
        userId: msg.author.id,
        userAvatar: msg.author.avatar
            ? `http://${cdnProxyUrl}/avatars/${msg.author.id}/${msg.author.avatar}.jpg?size=40`
            : `http://${cdnProxyUrl}/embed/avatars${+msg.author.discriminator % 5}.png`,
        content: markdown(msg.content).replace(URL_REGEXP, url => `<a href='${url}'>${url}</a>`),
        time: Qt.formatDateTime(date, "h:mm:ss AP, dd.MM.yyyy"),
        attachments: JSON.stringify(attachments),
    });

}

function loadMessages() {
    msgListModel.clear();
    Http.request<MessageDto[]>({
        method: "GET",
        path: `https://discord.com/api/v9/channels/${msgPage.channelId}/messages?limit=50`,
    }, (err, messages) => {
        if (err || !messages) return;
        messages.reverse().forEach(msg => appendMessage(msg));
        msgListView.positionViewAtIndex(messages.length - 1, ListView.End);
    });
}

function handleMessage(msg: MessageDto) {
    if (msg.channel_id === msgPage.channelId) {
        appendMessage(msg);
        msgListView.positionViewAtIndex(msgListView.count - 1, ListView.End);
    }
}

function handleReady() {
    defineTimers(msgPage);
    msgPage.setTimeout(() => {
        loadMessages();
        window.client.on("message", handleMessage);
    });

    inputField.implicitHeightChanged.connect(() => {
        if (inputField.text.indexOf("\n") !== -1) {
            sendMessage(inputField.text.replace("\n", ""));
        }
    });

    sendButton.clicked.connect(() => {
        sendMessage(inputField.text);
    });
}

function handleDestroyed() {
    window.client.off("message", handleMessage);
}