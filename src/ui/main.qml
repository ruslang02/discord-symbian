import QtQuick 1.1
import com.nokia.symbian 1.1
import "DMPage"
import "main.js" as Js
import "../js/client/Client.js" as Client

PageStackWindow {
    id: window
    platformSoftwareInputPanelEnabled: false
    platformInverted: false
    initialPage: DMPage { x: 0; y: 0; tools: toolBarLayout; }
    showStatusBar: true
    showToolBar: true

    Component.onCompleted: {
        Js.handleReady();
    }

    ToolBarLayout {
        id: toolBarLayout
        ToolButton {
            flat: true
            iconSource: "toolbar-back"
            onClicked: window.pageStack.depth <= 1 ? Qt.quit() : window.pageStack.pop()
        }

        ToolButton {
            id: toolbutton2
            x: 313
            y: 41
            text: "Login"
            onClicked: Js.handleLoginClick()
        }
    }
}
