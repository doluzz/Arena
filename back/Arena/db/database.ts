import { Database } from "bun:sqlite";

const db = new Database("db/data/database.sqlite");
const fileName = 'database'

console.log('Start ', fileName);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    puuid TEXT PRIMARY KEY,
    gameName TEXT,
    tagLine TEXT,
    riotId TEXT,
    createdDate TEXT,
    lastModifiedDate TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS matchs (
    matchId TEXT PRIMARY KEY,
    gameStartTimestamp TEXT,
    gameEndTimestamp TEXT,
    gameDuration TEXT,
    gameVersion TEXT,
    isFullyRetrieve BOOLEAN,
    ban1 INTEGER,
    ban2 INTEGER,
    ban3 INTEGER,
    ban4 INTEGER,
    ban5 INTEGER,
    ban6 INTEGER,
    ban7 INTEGER,
    ban8 INTEGER,
    ban9 INTEGER,
    ban10 INTEGER,
    ban11 INTEGER,
    ban12 INTEGER,
    ban13 INTEGER,
    ban14 INTEGER,
    ban15 INTEGER,
    ban16 INTEGER,
    createdDate TEXT,
    lastModifiedDate TEXT
  )
`);

// id = matchIdpuuid
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    matchId TEXT,
    puuid TEXT,
    gameName TEXT,
    tagLine TEXT,
    riotId TEXT,
    placement INTEGER,
    duoPuuid TEXT,
    duoRiotIdGameName TEXT,
    duoRiotIdTagline TEXT,
    championName TEXT,
    profileIcon INTEGER,
    createdDate TEXT,
    lastModifiedDate TEXT,
    FOREIGN KEY(matchId) REFERENCES matchs(matchId)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS datasPlayer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assists INTEGER,
    abilityUses INTEGER,
    skillshotsDodged INTEGER,
    skillshotsHit INTEGER,
    champLevel INTEGER,
    championName TEXT,
    consumablesPurchased INTEGER,
    damageSelfMitigated INTEGER,
    deaths INTEGER,
    goldEarned INTEGER,
    goldSpent INTEGER,
    item0 INTEGER,
    item1 INTEGER,
    item2 INTEGER,
    item3 INTEGER,
    item4 INTEGER,
    item5 INTEGER,
    item6 INTEGER,
    itemsPurchased INTEGER,
    kills INTEGER,
    largestCriticalStrike INTEGER,
    magicDamageDealt INTEGER,
    magicDamageDealtToChampions INTEGER,
    magicDamageTaken INTEGER,
    physicalDamageDealt INTEGER,
    physicalDamageDealtToChampions INTEGER,
    physicalDamageTaken INTEGER,
    placement INTEGER,
    playerAugment1 INTEGER,
    playerAugment2 INTEGER,
    playerAugment3 INTEGER,
    playerAugment4 INTEGER,
    playerAugment5 INTEGER,
    playerAugment6 INTEGER,
    profileIcon INTEGER,
    puuid TEXT,
    riotIdGameName TEXT,
    riotIdTagline TEXT,
    riotId TEXT,
    spell1Casts INTEGER,
    spell2Casts INTEGER,
    spell3Casts INTEGER,
    spell4Casts INTEGER,
    subteamPlacement INTEGER,
    summoner1Casts INTEGER,
    summoner1Id INTEGER,
    summoner2Casts INTEGER,
    summoner2Id INTEGER,
    summonerId TEXT,
    summonerLevel INTEGER,
    totalDamageDealt INTEGER,
    totalDamageDealtToChampions INTEGER,
    totalDamageShieldedOnTeammates INTEGER,
    totalDamageTaken INTEGER,
    totalHeal INTEGER,
    totalHealsOnTeammates INTEGER,
    totalTimeCCDealt INTEGER,
    totalTimeSpentDead INTEGER,
    trueDamageDealt INTEGER,
    trueDamageDealtToChampions INTEGER,
    trueDamageTaken INTEGER,
    playerId TEXT,
    createdDate TEXT,
    lastModifiedDate TEXT,
    matchId TEXT,
    FOREIGN KEY(playerId) REFERENCES player(id)
  )
`);


console.log('End ', fileName);