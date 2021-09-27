import QtQuick 1.1
import com.nokia.symbian 1.1
import "DMPage.js" as Js

Page {
    id: dmPage

    property string pageName: "Direct Messages"

    tools: toolbar

    Component.onCompleted: Js.handleReady()

    SystemPalette { id: palette; colorGroup: SystemPalette.Active }

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
        anchors.top: parent.top
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
                    source: userAvatar
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
