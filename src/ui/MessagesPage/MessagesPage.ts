import { Http } from "../../js/client/http/Http";
import { MessageDto } from "../../js/structures/dto/Message";
declare const Http: Http;
Qt.include("../../js/client/http/Http.js");

import { defineTimers } from "../timer";
declare const defineTimers: defineTimers;
Qt.include("../timer.js");

declare const msgPage: Qml.Page & Qml.WithTimers & { channelId?: string };
declare const msgListModel: Qml.ListModel;
declare const msgListView: Qml.ListView;
declare const sendButton: Qml.ToolButton;
declare const inputField: Qml.TextArea;

function handleReady() {
    defineTimers(msgPage);
    msgPage.setTimeout(() => {
        loadMessages();
        window.client.on("message", msg => {
            if (msg.channel_id === msgPage.channelId) {
                appendMessage(msg);
                msgListView.positionViewAtIndex(msgListView.count - 1, ListView.End);
            }
        })
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

function sendMessage(content: string) {
    inputField.text = "";
    Http.request<MessageDto[]>({
        method: "POST",
        path: `https://discord.com/api/v9/channels/${msgPage.channelId}/messages`,
        body: JSON.stringify({ content })
    }, (err, messages) => {
        if (err || !messages) return;
    });
}

function appendMessage(msg: MessageDto) {
    const splitTimestamp = msg.timestamp.split("T");
    const [year, month, day] = splitTimestamp[0].split("-");
    const [hour, minute, second] = splitTimestamp[1].split(".")[0].split(":");
    const date = new Date(+year, (+month) - 1, +day, +hour, +minute, +second);
    console.log(-1);
    msgListModel.append({
        username: msg.author.username,
        userId: msg.author.id,
        userAvatar: msg.author.avatar,
        content: msg.content,
        // @ts-ignore
        time: Qt.formatDateTime(date, "h:mm:ss AP, dd.MM.yyyy")
    });
}

function loadMessages() {
    msgListModel.clear();
    Http.request<MessageDto[]>({
        method: "GET",
        path: `https://discord.com/api/v9/channels/${msgPage.channelId}/messages?limit=50`
    }, (err, messages) => {
        if (err || !messages) return;
        messages.reverse().forEach(msg => appendMessage(msg));
        msgListView.positionViewAtIndex(messages.length - 1, ListView.End);
    });

}