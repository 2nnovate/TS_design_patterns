// singleton

class Database {
    private static DB: Database;

    private constructor() {}

    public static getDatabase(): Database {
        if (!Database.DB) {
            Database.DB = new Database();
        }
        return Database.DB;
    }
}

const database1 = Database.getDatabase();
const database2 = Database.getDatabase();

if (database1 === database2) {
    console.log('singleton works!');
} else {
    console.log('singleton failed!');
}
