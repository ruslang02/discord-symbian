import QtQuick 1.1
import "./launcher.js" as Js

Item {
    id: global

    Component.onCompleted: Js.handleReady()

    function exports() {}

    function require(url) {
        return Js.require(url);
    }

    function setTimeout(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 1.0; Timer {}", global);

        timer.interval = timeout || 1;
        timer.repeat = false;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearTimeout(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }

    function setInterval(callback, timeout) {
        const timer = Qt.createQmlObject("import QtQuick 1.0; Timer {}", global);

        timer.interval = timeout || 1;
        timer.repeat = true;
        timer.triggered.connect(callback);
        timer.start();

        return Js.timers.push(timer) - 1;
    }

    function clearInterval(index) {
        const timer = Js.timers[index];

        if (!timer) return;

        timer.stop();
        delete Js.timers[index];
    }
}