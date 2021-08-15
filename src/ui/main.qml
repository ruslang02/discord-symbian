import QtQuick 1.1
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

    InfoBanner {
        id: banner
    }

    ToolBarLayout {
        id: toolbar
        ToolButton {
            id: backButton
            flat: true
            iconSource: "toolbar-back"
        }

        ToolButton {
            id: loginButton
            text: "Sign in"
        }

        ToolButton {
            id: settingsButton
            iconSource: "toolbar-settings"
        }
    }
}
