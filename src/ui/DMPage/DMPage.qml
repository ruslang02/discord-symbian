import QtQuick 1.1
import com.nokia.symbian 1.1
import "DMPage.js" as Js

Page {
    id: dmPage

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }
    
    Button {
        text: "Load channels"
        z: 2
        anchors.bottom: parent.bottom
        onClicked: Js.loadChannels()
    }
    
    ListHeading {
        id: dmListHeading
        z: 3

        ListItemText {
            id: dmListHeadingText
            x: 0
            y: 3
            anchors.fill: dmListHeading.paddingItem
            role: "Heading"
            text: "Direct Messages"
            font.pointSize: 16
            horizontalAlignment: Text.AlignLeft
            verticalAlignment: Text.AlignTop
        }
    }

    ListModel {
        id: dmListModel
    }

    ListView {
        id: dmListView
        height: parent.height
        anchors.top: dmListHeading.bottom
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        model: dmListModel
        delegate: ListItem {
            id: userItem
            height: 48
            width: dmListView.width

            Row {
                spacing: 10
                Image {
                    id: userAvatar
                    width: 48
                    height: 48
                    sourceSize.width: 48
                    z: 1
                    smooth: true
                    source: "https://cdn.discordapp.com/avatars/" + id + "/" + avatar + ".jpg"
                }
                Column {
                    spacing: 0

                    Text {
                        text: username
                        font.bold: true
                        font.pixelSize: 18
                        color: palette.text
                    }

                    Text {
                        text: discriminator
                        font.pixelSize: 18
                        color: palette.text
                    }
                }
            }

        }
    }
}
