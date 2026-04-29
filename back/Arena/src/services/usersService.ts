import { Database } from "bun:sqlite";
import { User } from "../routes/users";
const db = new Database("db/data/database.sqlite");
import { env } from "../env";

export function getUsers() {
  return db.query("SELECT * FROM users").all() as User[];
}

export function getAllUsersRiotId() {
  return db.query(`SELECT RiotId FROM users`).all() as User[];
}

export async function createUser(puuid: string,gameName: string,tagLine: string,riotId: string) {
  const values = [puuid, gameName, tagLine, riotId, new Date().toISOString(), new Date().toISOString()]
  db.query("INSERT INTO users (puuid, gameName, tagLine, riotId, createdDate, lastModifiedDate) VALUES (?,?,?,?,?,?)").run(...values);
  console.log('ici')
  return { ok: true };
}

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  const res = await fetch(`${env.URL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${env.RIOT_API_KEY}`);
  const data = await res.json();
  console.log(data)
  await createUser(data.puuid,data.gameName,data.tagLine,data.gameName+'#'+data.tagLine)
}
