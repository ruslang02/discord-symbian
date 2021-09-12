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
            id: dialogField
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

            ListItem {
                id: cdnProxyUrlItem
                Column {
                    anchors.fill: cdnProxyUrlItem.paddingItem
                    ListItemText {
                        mode: cdnProxyUrlItem.mode
                        role: "Title"
                        text: "CDN proxy"
                    }
                    ListItemText {
                        mode: cdnProxyUrlItem.mode
                        role: "SubTitle"
                        text: "Hostname and port of the CDN HTTP proxy"
                    }
                }
            }

            ListItem {
                id: proxyUrlItem
                Column {
                    anchors.fill: proxyUrlItem.paddingItem
                    ListItemText {
                        mode: proxyUrlItem.mode
                        role: "Title"
                        text: "Gateway proxy"
                    }
                    ListItemText {
                        mode: proxyUrlItem.mode
                        role: "SubTitle"
                        text: "Hostname and port of the gateway proxy"
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
