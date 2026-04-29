import { Database } from "bun:sqlite";

const db = new Database("db/data/database.sqlite");
const fileName = 'database'

console.log('Start ', fileName);

//db.run(`DELETE FROM users`)

// db.run(`DELETE FROM matchs`)

// db.run(`DELETE FROM players`)

// db.run(`DELETE FROM data`)

db.run(`DROP TABLE datasPlayer`)

console.log('End ', fileName);