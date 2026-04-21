import { Player } from "../routes/players";
import { Database } from "bun:sqlite";
const db = new Database("db/data/database.sqlite");

export async function insertPlayers(matchId: string, player: Player[]) {

  const insertPlayersTransaction = db.transaction((player: Player[]) => {
    const stmt = db.query(
      "INSERT INTO players (id, matchId, puuid, gameName, tagLine, riotId, placement) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    for (const p of player) {
      stmt.run(`${matchId}${p.puuid}`,matchId, p.puuid, p.riotIdGameName, p.riotIdTagline, p.riotId, p.placement);
    }
  });

  insertPlayersTransaction(player);
}

