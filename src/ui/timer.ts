function defineTimers(component: any) {
    const timers: Qml.Timer[] = [];

    Object.defineProperty(component, "setTimeout", {
        value: (callback: () => void, timeout?: number) => {
            const timer = Qt.createQmlObject<Qml.Timer>("import QtQuick 1.0; Timer {}", component);
            timer.interval = timeout ?? 1;
            timer.repeat = false;
            timer.triggered.connect(callback);
            timer.start();
            return timers.push(timer) - 1;
        }
    });

    Object.defineProperty(component, "clearTimeout", {
        value: (index: number) => {
            const timer = timers[index];
            if (!timer) return;

            timer.stop();
            delete timers[index];
        }
    });

    Object.defineProperty(component, "setInterval", {
        value: (callback: () => void, timeout?: number) => {
            // @ts-ignore
            const timer = Qt.createQmlObject<Qml.Timer>("import QtQuick 1.0; Timer {}", component);
            timer.interval = timeout ?? 1;
            timer.repeat = true;
            timer.triggered.connect(callback);
            timer.start();
            return timers.push(timer) - 1;
        }
    });

    Object.defineProperty(component, "clearInterval", {
        value: (index: number) => {
            const timer = timers[index];
            if (!timer) return;

            timer.stop();
            delete timers[index];
        }
    });
}

export type defineTimers = typeof defineTimers;