declare const dmListModel: Qt.ListModel<{ username: string }>;

function loadChannels() {
    console.log("loading list...", window.client.privateChannels.length);
    dmListModel.clear();
    window.client.privateChannels.forEach(channel => {
        console.log(channel.id, channel.recipients[0].username);
        dmListModel.append(channel.recipients[0]);
    })
}