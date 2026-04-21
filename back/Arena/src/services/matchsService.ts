import { Database } from "bun:sqlite";
import { User } from "../routes/users";
const db = new Database("db/data/database.sqlite");
import { env } from "../env";
import { Match } from "../routes/matchs";
import { Player } from "../routes/players";
import { insertPlayers } from "./playersService";

type matchResponse = {
  info: {
    gameStartTimestamp: number,
    gameEndTimestamp: number,
    gameDuration: number,
    participants: Player[],
  };
};

export async function getMatchesIdByPuuidWithTime(puuid: string, startTime?: string, endTime?: string) {
  const type: string = "normal" //Return normal game + arena + aram classic
  const queueId: string = "1700" //Return only arena https://static.developer.riotgames.com/docs/lol/queues.json
  const start: string = "0"
  const count: string = "100"
  const res = await fetch(`${env.URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queueId}&type=${type}&startTime=${startTime}&endTime=${endTime}&start=${start}&count=${count}&api_key=${env.RIOT_API_KEY}`);
  const data = await res.json();
  console.log(data)
}

export async function getMatchesIdByPuuidWithoutTime(puuid: string) {
  const type: string = "normal" //Return normal game + arena + aram classic
  const queueId: string = "1700" //Return only arena https://static.developer.riotgames.com/docs/lol/queues.json
  const start: string = "0"
  const count: string = "100"
  const res = await fetch(`${env.URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queueId}&type=${type}&start=${start}&count=${count}&api_key=${env.RIOT_API_KEY}`);
  const data = await res.json();

  await insertMatchsId(data)
  console.log(data)
}

export async function insertMatchsId(matchsId: string[]) {
  const placeholders = matchsId.map(() => "(?, ?)").join(", ");

  const values = matchsId.flatMap(id => [id, false]);

  db.query(`INSERT INTO matchs (matchId, isFullyRetrieve) VALUES ${placeholders}`).run(...values);

  console.log("insertMatchsId ok")
  return { ok: true };
}

export async function updateMatchId(matchId: string) {

  const isAlreadyUpdate = db.query(`SELECT matchId FROM matchs WHERE matchId = ? AND isFullyRetrieve = true`).all(matchId).length > 0 ? true : false

  if (isAlreadyUpdate) {
    return `Match : ${matchId} déjà récupéré`
  }

  const res = await getMatchByMatchId(matchId) as matchResponse
  //const players = res.info.participants
  const players = mappingPlayer(res.info.participants)


  const match: Match = {
    matchId: matchId,
    startDate: res.info.gameStartTimestamp,
    endDate: res.info.gameEndTimestamp,
    duration: res.info.gameDuration,
    isFullyRetrieve: true,
  }

  //const values = [match.startDate, match.endDate, match.placements, match.duration, match.isFullyRetrieve, matchId]
  db.query(`UPDATE matchs SET startDate = ?, endDate = ?, duration = ?, isFullyRetrieve = ? WHERE matchId = ?`).run(match.startDate, match.endDate, match.duration, match.isFullyRetrieve, matchId);

  insertPlayers(matchId, players)
  
  return match
}

async function getMatchByMatchId(matchId: string) {
  const res = await fetch(`${env.URL}/lol/match/v5/matches/${matchId}?api_key=${env.RIOT_API_KEY}`);
  const data = await res.json();
  return data
}

function mappingPlayer(players: Player[]){
  const result: Player[] = players.map((p) => ({
    //No transform
    puuid: p.puuid,
    riotIdGameName: p.riotIdGameName,
    riotIdTagline: p.riotIdTagline,
    profileIcon: p.profileIcon,
    placement: p.placement,
    playerAugment1: p.playerAugment1,
    playerAugment2: p.playerAugment2,
    playerAugment3: p.playerAugment3,
    playerAugment4: p.playerAugment4,
    playerAugment5: p.playerAugment5,
    playerAugment6: p.playerAugment6,
    item0: p.item0,
    item1: p.item1,
    item2: p.item2,
    item3: p.item3,
    item4: p.item4,
    item5: p.item5,
    item6: p.item6,
    //Transform
    riotId: `${p.riotIdGameName}#${p.riotIdTagline}`,
    jsonData: JSON.stringify(p)
    }));
  return result
}