import QtQuick 1.1
import com.nokia.symbian 1.1
import "./SettingsPage.js" as Js

Page {
    id: settingsPage

    Component.onCompleted: Js.handleReady()

    tools: ToolBarLayout {
        ToolButton { iconSource: "toolbar-back"; onClicked: pageStack.pop() }
    }

    CommonDialog {
        id: dialog
        titleText: "Token"
        buttonTexts: ["OK", "Cancel"]
        content: TextField {
            id: tokenField
            focus: true
            width: parent.width
            anchors.top: parent.top
            anchors.topMargin: 15
            anchors.left: parent.left
            anchors.leftMargin: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            platformInverted: true
        }
    }

    ListView {
        id: settingsList
        Column {
            ListItem {
                id: tokenItem
                Column {
                    anchors.fill: tokenItem.paddingItem
                    ListItemText {
                        mode: tokenItem.mode
                        role: "Title"
                        text: "Token"
                    }
                    ListItemText {
                        mode: tokenItem.mode
                        role: "SubTitle"
                        text: "Discord user authentication token"
                    }
                }
            }
    
            SelectionListItem {
                id: debugModeItem
                title: "Debug mode"
            }
        }
    }
}
