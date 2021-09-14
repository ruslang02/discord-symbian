import { schemas, Schemas, StoreKey } from "./schemas";

type DbField = {
    name: string
    value: string
};

export class DatabaseStore {
    private db: Qt.Database;
    private cache: Record<StoreKey, Schemas[StoreKey]> = {} as Record<StoreKey, Schemas[StoreKey]>;

    constructor() {
        this.db = openDatabaseSync(
            "DiscordDb", "1.0",
            "Settings store for Discord client.",
            100 * 1024 // bytes
        );

        this.init();
    }

    init() {
        this.db.transaction(tx => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS AppData(name TEXT UNIQUE, value TEXT)");
            Object.keys(schemas).forEach(key => {
                const data = tx.executeSql("SELECT * FROM AppData WHERE name = ?", [key]);

                if (data.rows.length === 0)
                    tx.executeSql(
                        "INSERT INTO AppData Values(?, ?)",
                        [key, JSON.stringify(schemas[key as StoreKey])]
                    );
            });
        });

        this.fetchAll();
    }

    fetchAll() {
        Object.keys(schemas).forEach(key => {
            this.fetch(key as StoreKey, data => {
                this.cache[key as StoreKey] = data;
            });
        });
    }

    fetch<K extends StoreKey>(key: K, callback: (data: Schemas[K]) => void) {
        this.db.readTransaction(tx => {
            const result = tx.executeSql<DbField>("SELECT * FROM AppData WHERE name = ?", [key]);
            const data: Schemas[K] = JSON.parse(result.rows.item(0).value);

            callback(data);
        });
    }

    get<K extends StoreKey>(key: K): Readonly<Schemas[K]> {
        return this.cache[key] ?? schemas[key];
    }

    set<K extends StoreKey>(key: K, data: Schemas[K] | ((data: Schemas[K]) => Schemas[K])) {
        this.db.transaction(tx => {
            if (typeof data === "function") {
                this.fetch(key, realData => {
                    this.cache[key] = realData;
                    tx.executeSql(
                        "UPDATE AppData SET value = ? WHERE name = ?",
                        [JSON.stringify(realData), key]
                    );
                });
            } else {
                this.cache[key] = data;
                tx.executeSql(
                    "UPDATE AppData SET value = ? WHERE name = ?",
                    [JSON.stringify(data), key]
                );
            }
        });
    }
}
