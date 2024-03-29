/** @format */

import express from "express";
import { secretKey } from "./app/config.js";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import sequelizeStore from "connect-session-sequelize";
import bodyParser from "body-parser";
import db from "./database/database.js";
// Import Route Citizen
import authRoute from "./app/Citizen/auth/authRoute.js";
import letterRoute from "./app/Citizen/letters/letterRoute.js";
import complaintRoute from "./app/Citizen/complaint/complaintRoute.js";
import complaintResultRoute from "./app/Citizen/complaintResult/complaintResultRoute.js";
import newsRoute from "./app/Citizen/news/newsRouter.js";
// Import Route Admin
import authAdminRoute from "./app/Admin/auth/authAdminRoute.js";
import lettersAdminRoute from "./app/Admin/lettersAdmin/lettersAdminRoute.js";
import complaintAdminRoute from "./app/Admin/complaintAdmin/complaintAdminRoute.js";
import complaintResultAdminRoute from "./app/Admin/complaintResult/complaintResultRoute.js";
import NewsAdminRoute from "./app/Admin/newsAdmin/newsAdminRoute.js";

const app = express();

// (async () => {
//   await db.sync();
// })();

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
   db: db,
});

app.use(
   session({
      name: "authenticated",
      secret: secretKey,
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
         secure: "auto",
         httpOnly: true,
         maxAge: 1000 * 60 * 60 * 24 * 1, // 1 Day
      },
   })
);

app.use(
   cors({
      credentials: true,
      origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
   })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

// User / Citizen
app.use("/api", authRoute);
app.use("/api", letterRoute);
app.use("/api", complaintRoute);
app.use("/api", complaintResultRoute);
app.use("/api", newsRoute);

// Admin
app.use("/api", authAdminRoute);
app.use("/api", lettersAdminRoute);
app.use("/api", complaintAdminRoute);
app.use("/api", complaintResultAdminRoute);
app.use("/api", NewsAdminRoute);

app.listen(5000, "localhost", () => {
   console.log("Server listening on port 5000");
});
