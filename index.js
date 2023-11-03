import connectSequelize from "connect-session-sequelize";
import "dotenv/config";
import express from "express";
import exphbs from "express-handlebars";
import session, { Store } from "express-session";
import { nanoid } from "nanoid";
import db from "./config/connection.js";
import routeLoader from "./lib/routeLoader.js";

import { User, Post } from "./lib/models/index.js";

import helpers from "./lib/helpers.js";

const SequelizeStore = connectSequelize(Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET || nanoid(),
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create({ extname: ".hbs", helpers });
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.static("public"));

await routeLoader("controllers", app);

app.use((req, res) => {
  res.status(404).render("404");
});

await db.sync({ force: false });
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
