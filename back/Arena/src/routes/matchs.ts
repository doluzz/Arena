import { Hono } from "hono";
import { getMatchesIdByPuuidWithoutTime, updateAllMatchs } from "../services/matchsService";
import { User } from "../routes/users";
import { getUsers } from "../services/usersService";

const route = new Hono();

export type Match = {
  matchId: string;
  startDate: number;
  endDate: number;
  duration: number;
  isFullyRetrieve: boolean;
};

//Retrive all match for a puuid then add in DB
route.post("/", async (c) => {
  const json = await c.req.json()
  const puuid = json.puuid
  if (!puuid) {
    return c.json({ error: "puuid missing" }, 400);
  }
  getMatchesIdByPuuidWithoutTime(puuid)
  return c.json({});
});

//Retrive data from a match with matchId then add in DB all the data
// route.post("/complet/", async (c) => {
//   const json = await c.req.json()
//   const matchId = json.matchId
//   if (!matchId) {
//     return c.json({ error: "matchId missing" }, 400);
//   }
//   const res = await updateMatchId(matchId)
//   console.log(res)
//   return c.json(`matchId : ${matchId} has been updated. ${res}`)
// });

//Give the X last game for a specific puuid
route.post("/XMatches/", async (c) => {
  const json = await c.req.json()
  const numberOfMatchs = json.numberOfMatchs
  const puuid = json.puuid
  return c.json({})
});

route.post("/retrieveMatchsForInit", async (c) => {
  //Get all users
  const users: User[] = getUsers()
  //Retrieve 100 games by users with lastUpdatedTime in params
  let b = '';
  for (const user of users) {
    let a = await getMatchesIdByPuuidWithoutTime(user.puuid)
    console.log('user : ', user.riotId, 'matchId insert :', a)
    if (a != 'no match to insert') {
      b += JSON.stringify([{user: user.riotId, matchsId: JSON.stringify(a)}])
    }
  }
  return c.json(b)
});

route.post("/updateAllMatchs", async (c) => {
  const res = updateAllMatchs()
  return c.json({message : 'cest bon'})
})

export default route;