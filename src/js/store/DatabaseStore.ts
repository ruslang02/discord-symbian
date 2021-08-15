import { schemas, StoreKey } from "./schemas";
declare const schemas: schemas;
Qt.include("./schemas.js");

type DbField = {
    name: string
    value: string
};

const Store = class DatabaseStore {
    private db: Qt.Database;
    private cache: Record<StoreKey, schemas[StoreKey]> = {} as Record<StoreKey, schemas[StoreKey]>;

    constructor() {
        this.db = openDatabaseSync("DiscordDb", "1.0", "Settings store for Discord client.", 100000);
        this.init();
    }

    init() {
        this.db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS AppData(name TEXT UNIQUE, value TEXT)");
            Object.keys(schemas).forEach((key) => {
                const data = tx.executeSql("SELECT * FROM AppData WHERE name = ?", [key]);
                if (data.rows.length === 0)
                    tx.executeSql("INSERT INTO AppData Values(?, ?)", [key, JSON.stringify(schemas[key as StoreKey])]);
            });
        });
        this.fetchAll();
    }

    fetchAll() {
        Object.keys(schemas).forEach((key) => {
            this.fetch(key as StoreKey, data => this.cache[key as StoreKey] = data);
        });
    }

    fetch<K extends StoreKey>(key: K, callback: (data: schemas[K]) => void) {
        this.db.readTransaction(tx => {
            const result = tx.executeSql<DbField>("SELECT * FROM AppData WHERE name = ?", [key]);
            const data: schemas[K] = JSON.parse(result.rows.item(0).value);

            callback(data);
        })
    }

    get<K extends StoreKey>(key: K): Readonly<schemas[K]> {
        return this.cache[key] ?? schemas[key];
    }

    set<K extends StoreKey>(key: K, data: schemas[K] | ((data: schemas[K]) => schemas[K])) {
        this.db.transaction(tx => {
            if (typeof data === "function") {
                this.fetch(key, realData => {
                    this.cache[key] = realData;
                    tx.executeSql("UPDATE AppData SET value = ? WHERE name = ?", [JSON.stringify(realData), key]);
                })
            } else {
                this.cache[key] = data;
                tx.executeSql("UPDATE AppData SET value = ? WHERE name = ?", [JSON.stringify(data), key]);
            }
        });
    }
}

export type DatabaseStore = typeof Store;
export type DatabaseStoreInst = InstanceType<typeof Store>;