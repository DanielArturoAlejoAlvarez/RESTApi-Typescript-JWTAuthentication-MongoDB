import config from "./config/config";
import express, { Application } from "express";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import { createRole } from "./libs/setup";

const app: Application = express();

createRole();

app.set("port", config.port);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

export default app;
