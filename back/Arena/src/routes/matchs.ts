import { Hono } from "hono";
import { getMatchesIdByPuuidWithoutTime, updateMatchId } from "../services/matchsService";

const route = new Hono();

export type Match = {
  matchId: string;
  startDate: number;
  endDate: number;
  duration: number;
  isFullyRetrieve: boolean;
};

//Récupère les matchs pour un puuid puis insert
route.post("/", async (c) => {
  const json = await c.req.json()
  const puuid = json.puuid
  if (!puuid) {
    return c.json({ error: "puuid missing" }, 400);
  }
  getMatchesIdByPuuidWithoutTime(puuid)
  return c.json({});
});

//Update
route.post("/complet/:matchId", async (c) => {
  const matchId = c.req.param('matchId')
  const res = await updateMatchId(matchId)
  console.log(res)
  return c.json({
    res
  })
});

route.post("/retrieve/:matchId", (c) => {
  const matchId = c.req.param('matchId')
  return c.json({
    matchId
  })
});

export default route;