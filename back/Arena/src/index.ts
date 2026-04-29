import { Hono } from "hono";
import { cors } from "hono/cors"
import usersRoute from "./routes/users";
import matchsRoute from "./routes/matchs";
import initRoute from "./routes/init";

const app = new Hono();

app.use('*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type'],
}))

app.route("/init", initRoute);
app.route("/matchs", matchsRoute);
app.route("/users", usersRoute);

export default app;