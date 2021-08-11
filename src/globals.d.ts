type QSignal<T> = {
    connect(slot: (arg1: T) => void): void
}
interface Socket {
    connectToServer(): void;
    send(payload: string): void;

    messageReceived: QSignal<string>
}
declare namespace Qt {
    type TransactionResult<T = any> = {
        insertId: string
        rowsAffected: number
        rows: {
            length: number
            at(i: number): T
        }
    }
    type Transaction = {
        executeSql<T = any>(statement: string, values: any[]): TransactionResult<T>
    }
    type Database = {
        transaction(callback: (tx: Transaction) => void): void
        readTransaction(callback: (tx: Transaction) => void): void
    }

    type ListModel<T = any> = {
        setProperty(index: number, prop: string, value: T): void;
        remove(index: number): void;
        append(value: T): void;
        clear(): void;
    }

    declare function include(filename: string): void;
}

declare function openDatabaseSync(identifier: string, version: string, description: string, estimatedSize: number): Database;

declare interface Window {
    client: import("./js/client/Client").Client
}

const socket: Socket;