import { Database } from "bun:sqlite";
import { User } from "../routes/users";
const db = new Database("db/data/database.sqlite");
import { env } from "../env";
import { Match } from "../routes/matchs";
import { Player, PlayerWithDuo } from "../routes/players";
import { insertPlayers } from "./playersService";

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

  return await checkIfMatchAlreadyExist(data)
}

async function checkIfMatchAlreadyExist(matchsId: string[]) {
  const alreadyExist = db.query<{matchId: string},[]>(`SELECT matchId FROM matchs`).all().map((value)=>value.matchId)
  const matchsToInsert = matchsId.filter((value)=> !alreadyExist.includes(value))
  console.log('checkIfMatchAlreadyExist :', matchsId)
  console.log('alreadyExist :', alreadyExist)
  console.log('matchsToInsert :', matchsToInsert)
  if (matchsToInsert === undefined || matchsToInsert.length == 0) {
    return 'no match to insert'
  }
  return await insertMatchsId(matchsToInsert);
}

export async function insertMatchsId(matchsId: string[]) {
  const placeholders = matchsId.map(() => "(?, ?, ?, ?)").join(", ");
  const values = matchsId.flatMap(id => [id, false, new Date().toISOString(),new Date().toISOString()]);

  db.query(`INSERT INTO matchs (matchId, isFullyRetrieve, createdDate, lastModifiedDate) VALUES ${placeholders}`).run(...values);
  return { matchsInserted: matchsId };
}

// export async function updateMatchId(matchId: string) {

//   const isAlreadyUpdate = db.query(`SELECT matchId FROM matchs WHERE matchId = ? AND isFullyRetrieve = true`).all(matchId).length > 0 ? true : false

//   if (isAlreadyUpdate) {
//     return `Match : ${matchId} déjà récupéré`
//   }

//   const res = await getMatchByMatchId(matchId) as riotMatchResponse
//   //const players = res.info.participants
//   const players = mappingPlayer(res.info.participants)


//   const match: Match = {
//     matchId: matchId,
//     startDate: res.info.gameStartTimestamp,
//     endDate: res.info.gameEndTimestamp,
//     duration: res.info.gameDuration,
//     isFullyRetrieve: true,
//   }

//   //const values = [match.startDate, match.endDate, match.placements, match.duration, match.isFullyRetrieve, matchId]
//   db.query(`UPDATE matchs SET startDate = ?, endDate = ?, duration = ?, isFullyRetrieve = ? WHERE matchId = ?`).run(match.startDate, match.endDate, match.duration, match.isFullyRetrieve, matchId);

//   insertPlayers(matchId, players)
  
//   return match
// }

async function getMatchByMatchId(matchId: string) {
  const res = await fetch(`${env.URL}/lol/match/v5/matches/${matchId}?api_key=${env.RIOT_API_KEY}`);
  const data = await res.json();
  return data
}

function mappingPlayer(players: Player[]){
  return players.map((p) => {
    const duo = players.find(
      other => other.placement === p.placement && other.puuid !== p.puuid
    )

    return {
      ...p,
      duoData: {
        duo : {
          duoPuuid: duo?.puuid ?? null,
          duoRiotIdGameName: duo?.riotIdGameName ?? null,
          duoRiotIdTagline: duo?.riotIdTagline ?? null
        }
      }
    }
  });
}

// 20 requests every 1 second
// 100 requests every 2 minutes
export async function updateAllMatchs(){
  const matchs = db.query<{matchId: string},[]>(`SELECT matchId FROM matchs WHERE isFullyRetrieve = false LIMIT 50`).all()

  for (const match of matchs) {
    let matchJson = await getMatchByMatchId(match.matchId) as riotMatchResponse

    let listBanIds = matchJson.info.teams[0].bans.map(ban => ban.championId)

    let values = [matchJson.info.gameStartTimestamp, matchJson.info.gameEndTimestamp, matchJson.info.gameDuration, matchJson.info.gameVersion, true, listBanIds[0], listBanIds[1], listBanIds[2], listBanIds[3], listBanIds[4], listBanIds[5], listBanIds[6], listBanIds[7], listBanIds[8], listBanIds[9], listBanIds[10], listBanIds[11], listBanIds[12], listBanIds[13], listBanIds[14], listBanIds[15], new Date().toISOString(), match.matchId]
    db.query(`UPDATE matchs SET gameStartTimestamp = ?, gameEndTimestamp = ?, gameDuration = ?, gameVersion = ?, isFullyRetrieve = ?, ban1 = ?, ban2 = ?, ban3 = ?, ban4 = ?, ban5 = ?, ban6 = ?, ban7 = ?, ban8 = ?, ban9 = ?, ban10 = ?, ban11 = ?, ban12 = ?, ban13 = ?, ban14 = ?, ban15 = ?, ban16 = ?, lastModifiedDate = ? WHERE matchId = ?`).run(...values);

    insertPlayers(match.matchId, mappingPlayer(matchJson.info.participants))
  }
  return {message: "ok"}
}

type riotMatchResponse = {
  metadata: {
    matchId: string,
  },
  info: {
    gameStartTimestamp: number,
    gameEndTimestamp: number,
    gameDuration: number,
    gameVersion: string,
    participants: Player[],
    teams: {
      bans: {
        championId: number
      }[]
    }[]
  },
  
}
