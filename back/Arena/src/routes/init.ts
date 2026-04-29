import { Hono } from "hono";
import { User } from "../routes/users";
import { getUsers } from "../services/usersService";
import { getMatchesIdByPuuidWithoutTime } from "../services/matchsService";
const route = new Hono();

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



route.get("/", async (c) => {
  const res = await getMatchesIdByPuuidWithoutTime('E1-_3_JEidS98A7nLfoyjzRtC9g9NM8BSYZ0PcyKJ8gdNxScXrvwuMth_G_dbGX3g5yI8TMRV67nXw')
  console.log('response',res)
  return c.json(res);
})

export default route;