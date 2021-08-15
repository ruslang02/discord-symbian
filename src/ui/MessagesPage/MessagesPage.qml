import QtQuick 1.1
import com.nokia.symbian 1.1
import "MessagesPage.js" as Js

Page {
    property string channelId;
    property string channelName;
    id: msgPage

    Component.onCompleted: Js.handleReady()

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
        ToolButton { iconSource: "toolbar-search" }
        ToolButton { iconSource: "toolbar-add" }
        ToolButton { iconSource: "toolbar-menu" }
    }
    
    ListModel {
        id: msgListModel
    }

    ListView {
        id: msgListView
        anchors.top: parent.top
        anchors.right: parent.right
        anchors.left: parent.left
        anchors.leftMargin: 0
        anchors.bottom: inputPanel.top

        spacing: 10

        model: msgListModel
        delegate: Column {
            id: item1
            width: msgListView.width
            spacing: 5
            Row {
                height: 20
                spacing: 5
                Image {
                    id: avatarImage
                    width: 20
                    height: 20
                    sourceSize.width: 20
                    sourceSize.height: 20
                    z: 1
                    source: "https://cdn.discordapp.com/avatars/" + userId + "/" + userAvatar + ".jpg?size=20"
                }

                Text {
                    id: usernameText
                    text: username
                    font.bold: true
                    font.pixelSize: 18
                    color: palette.text
                }

                Text {
                    text: time
                    font.pixelSize: 14
                    color: palette.text
                }
            }

            Text {
                text: content
                font.pixelSize: 16
                width: msgListView.width
                color: palette.text
                wrapMode: Text.WrapAnywhere
            }
        }
    }
    Item {
        id: inputPanel
        height: 48
        anchors.bottom: parent.bottom
        anchors.right: parent.right
        anchors.left: parent.left
        Rectangle {
            color: palette.base
            anchors.top: parent.top
            anchors.bottom: parent.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            z: 1
        }
        TextArea {
            id: inputField
            anchors.top: parent.top
            anchors.bottom: parent.bottom
            anchors.left: parent.left
            anchors.right: sendButton.left
            anchors.rightMargin: 5
            z: 2
            placeholderText: "Message " + channelName
        }
        ToolButton {
            id: sendButton
            width: 48
            height: 48
            iconSource: "toolbar-next"
            anchors.right: parent.right
            z: 2
        }
    }
}
