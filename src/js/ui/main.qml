import QtQuick 1.1
import QtMobility.feedback 1.1
import com.nokia.symbian 1.1
import com.nokia.extras 1.1
import "DMPage"
import "MessagesPage"
import "main.js" as Js

PageStackWindow {
    id: window
    platformSoftwareInputPanelEnabled: true
    platformInverted: false
    initialPage: DMPage { x: 0; y: 0; tools: toolbar; }
    showStatusBar: true
    showToolBar: true

    Component.onCompleted: Js.handleReady()

    HapticsEffect {
        id: hapticsEffect;
        attackTime: 250;
        fadeTime: 250;
        attackIntensity: 0;
        fadeIntensity: 0
    }

    InfoBanner {
        id: banner
    }

    Menu {
        id: menu
        content: MenuLayout {
            MenuItem {
                id: loginButton
                text: "Sign in"
            }
            MenuItem {
                id: settingsButton
                text: "Settings"
            }
            MenuItem {
                id: backButton
                text: "Exit"
            }
        }
    }

    ToolBarLayout {
        id: toolbar

        ToolButton {
            id: minimizeButton
            flat: true
            iconSource: "toolbar-back"
        }

        ToolButton {
            id: menuButton
            iconSource: "toolbar-menu"
        }
    }

    StatusBar {
        y: -window.y
        Item {
            anchors { left: parent.left; leftMargin: 6; bottom: parent.bottom; top: parent.top }
            width: parent.width - 186;
            clip: true
            Text {
                id: statusBarText
                anchors.verticalCenter: parent.verticalCenter
                maximumLineCount: 1
                color: "white"
                font.pointSize: 6
                font.bold: true
            }
            Rectangle {
                width: 25
                anchors { top: parent.top; bottom: parent.bottom; right: parent.right }
                rotation: -90
                gradient: Gradient {
                    GradientStop { position: 0.0; color: "#00000000" }
                    GradientStop { position: 1.0; color: "#ff000000" }
                }
            }
        }
        Connections {
            target: pageStack
            onCurrentPageChanged: statusBarText.text = pageStack.currentPage.pageName
        }
    }
}
