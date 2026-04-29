import { PlayerWithDuo } from "../routes/players";
import { Database } from "bun:sqlite";
const db = new Database("db/data/database.sqlite");

export async function insertPlayers(matchId: string, player: PlayerWithDuo[]) {

  const insertPlayersTransaction = db.transaction((player: PlayerWithDuo[]) => {
    const queryPlayer = db.query(
      "INSERT INTO players (id, matchId, puuid, gameName, tagLine, riotId, placement, duoPuuid, duoRiotIdGameName, duoRiotIdTagline, championName, profileIcon, createdDate, lastModifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    const queryDatasPlayer = db.query(
      "INSERT INTO datasPlayer (assists,abilityUses,skillshotsDodged,skillshotsHit,champLevel,championName,consumablesPurchased,damageSelfMitigated,deaths,goldEarned,goldSpent,item0,item1,item2,item3,item4,item5,item6,itemsPurchased,kills,largestCriticalStrike,magicDamageDealt,magicDamageDealtToChampions,magicDamageTaken,physicalDamageDealt,physicalDamageDealtToChampions,physicalDamageTaken,placement,playerAugment1,playerAugment2,playerAugment3,playerAugment4,playerAugment5,playerAugment6,profileIcon,puuid,riotIdGameName,riotIdTagline,riotId,spell1Casts,spell2Casts,spell3Casts,spell4Casts,subteamPlacement,summoner1Casts,summoner1Id,summoner2Casts,summoner2Id,summonerId,summonerLevel,totalDamageDealt,totalDamageDealtToChampions,totalDamageShieldedOnTeammates,totalDamageTaken,totalHeal,totalHealsOnTeammates,totalTimeCCDealt,totalTimeSpentDead,trueDamageDealt,trueDamageDealtToChampions,trueDamageTaken,playerId,createdDate,lastModifiedDate,matchId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    for (const p of player) {
      queryPlayer.run(`${matchId}${p.puuid}`,matchId, p.puuid, p.riotIdGameName, p.riotIdTagline, `${p.riotIdGameName}#${p.riotIdTagline}`, p.placement, p.duoData.duo.duoPuuid, p.duoData.duo.duoRiotIdGameName, p.duoData.duo.duoRiotIdTagline, p.championName, p.profileIcon, new Date().toISOString(), new Date().toISOString());
      queryDatasPlayer.run(p.assists, p.challenges.abilityUses, p.challenges.skillshotsDodged, p.challenges.skillshotsHit, p.champLevel, p.championName, p.consumablesPurchased, p.damageSelfMitigated, p.deaths, p.goldEarned, p.goldSpent, p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6, p.itemsPurchased, p.kills, p.largestCriticalStrike, p.magicDamageDealt, p.magicDamageDealtToChampions, p.magicDamageTaken, p.physicalDamageDealt, p.physicalDamageDealtToChampions, p.physicalDamageTaken, p.placement, p.playerAugment1, p.playerAugment2, p.playerAugment3, p.playerAugment4, p.playerAugment5, p.playerAugment6, p.profileIcon, p.puuid, p.riotIdGameName, p.riotIdTagline, `${p.riotIdGameName}#${p.riotIdTagline}`, p.spell1Casts, p.spell2Casts, p.spell3Casts, p.spell4Casts, p.subteamPlacement, p.summoner1Casts, p.summoner1Id, p.summoner2Casts, p.summoner2Id, p.summonerId, p.summonerLevel, p.totalDamageDealt, p.totalDamageDealtToChampions, p.totalDamageShieldedOnTeammates, p.totalDamageTaken, p.totalHeal, p.totalHealsOnTeammates, p.totalTimeCCDealt, p.totalTimeSpentDead, p.trueDamageDealt, p.trueDamageDealtToChampions, p.trueDamageTaken, `${matchId}${p.puuid}`,new Date().toISOString(),new Date().toISOString(),`${matchId}${p.puuid}`)
    }
  });

  insertPlayersTransaction(player);

}