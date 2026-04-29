import { Hono } from "hono";
import { getUsers, createUser, getAccountByRiotId, getAllUsersRiotId } from "../services/usersService";

export type User = {
  id: number;
  puuid: string;
  gameName: string;
  tagLine: string;
  riotId: string;
  lastUpdatedTime: string;
};

const listUsersRiotId = ["dolu13#BATON","PisseMystique#KKdu6","LeSPQR844#EUWET","strylax#EUW","Oneezuka#EUW"] //TODO input

const route = new Hono();

//Simply return all the User already in the DB
route.get("/", (c) => {
  return c.json(getUsers());
});

//Retrieve User by UserId in listUsersRiotId then add to DB
route.get("/InsertAllUsers", async (c) => {
    const allUsers: User[] = getUsers()
    const allUsersRiotId: String[] = allUsers.map(u => u.riotId);

    const usersToCreate: String[] = listUsersRiotId.filter(x => !allUsersRiotId.includes(x));
    console.log('usersToCreate',usersToCreate)

    for (const element of usersToCreate) {
      let splitRiotId = element.split('#')
      await getAccountByRiotId(splitRiotId[0],splitRiotId[1])
    }
    return c.json({message: 'User have been created with success'});
});

export default route;