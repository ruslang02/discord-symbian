import QtQuick 1.1
import com.nokia.symbian 1.1
import "DMPage.js" as Js

Page {
    id: dmPage

    Component.onCompleted: Js.handleReady()

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }
    
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

    Component {
        id: dmHighlightView

        Rectangle {
            width: dmListView.width
            height: 40
            color: palette.highlight
            y: dmListView.currentItem.y
        }
    }

    ListView {
        id: dmListView
        height: parent.height
        anchors.top: dmListHeading.bottom
        anchors.right: parent.right
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        model: dmListModel
        highlight: dmHighlightView
        highlightFollowsCurrentItem: true
        highlightMoveDuration: 0
        highlightResizeDuration: 0
        highlightMoveSpeed: 0
        highlightResizeSpeed: 0
        focus: true

        delegate: MouseArea {
            id: dmListItem
            width: dmListView.width
            height: 40
            onPressed: {
                dmListView.currentIndex = index;
            }
            onClicked: Js.openMessages(id)
            Row {
                spacing: 10
                Image {
                    width: 40
                    height: 40
                    sourceSize.width: 40
                    sourceSize.height: 40
                    source: "https://cdn.discordapp.com/avatars/" + userId + "/" + userAvatar + ".jpg?size=40"
                }
                Text {
                    y: 8
                    text: "<b>" + userName + "</b>#" + userDiscriminator
                    font.pixelSize: 18
                    color: palette.text
                }
            }
        }
    }
}
