import { Hono } from "hono";
import usersRoute from "./routes/users";
import matchsRoute from "./routes/matchs";

const app = new Hono();
 
// app.get("/test", (c) => {
//   const apiKey = process.env.RIOT_API_KEY;

//   console.log(apiKey)
//   return c.json({
//     key: apiKey,
//   });
// });
app.route("/matchs", matchsRoute);
app.route("/users", usersRoute);

export default app;