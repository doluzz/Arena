import { Database } from "bun:sqlite";

const db = new Database("db/data/database.sqlite");
const fileName = 'database'

console.log('Start ', fileName);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    puuid TEXT PRIMARY KEY,
    gameName TEXT,
    tagLine TEXT,
    riotId TEXT
  )
`);

// placements = ["puuid:placement","puuid:placement"...]
db.run(`
  CREATE TABLE IF NOT EXISTS matchs (
    matchId TEXT PRIMARY KEY,
    startDate TEXT,
    endDate TEXT,
    duration TEXT,
    isFullyRetrieve BOOLEAN
  )
`);

// id = matchId-puuid
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    matchId TEXT,
    puuid TEXT,
    gameName TEXT,
    tagLine TEXT,
    riotId TEXT,
    items TEXT,
    placement INTEGER,
    duoPuuid TEXT,
    ban TEXT,
    champion TEXT,
    augments TEXT,
    icon TEXT,
    FOREIGN KEY(matchId) REFERENCES matchs(matchId)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playerId TEXT,
    championName TEXT,
    FOREIGN KEY(playerId) REFERENCES player(id)
  )
`);


console.log('End ', fileName);