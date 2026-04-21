import { Hono } from "hono";
import { getUsers, createUser, getAccountByRiotId, getAllUsersRiotId } from "../services/usersService";

export type User = {
  id: number;
  puuid: string;
  gameName: string;
  tagLine: string;
  riotId: string;
};

const listUsersRiotId = ["dolu13#BATON","PisseMystique#KKdu6"] //TODO input

const route = new Hono();

// route.get("/", (c) => {
//   return c.json(getUsers());
// });

route.get("/", async (c) => {
    const allUsers: User[] = getUsers()
    const allUsersRiotId: String[] = allUsers.map(u => u.riotId);

    const usersToCreate: String[] = listUsersRiotId.filter(x => !allUsersRiotId.includes(x));
    console.log('usersToCreate',usersToCreate)

    usersToCreate.forEach(element => {
      let splitRiotId = element.split('#')
      return c.json(getAccountByRiotId(splitRiotId[0],splitRiotId[1]));
    });

});

export default route;