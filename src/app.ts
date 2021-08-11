import config from "./config/config";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes";
import userRoutes from './routes/user.routes'
import { createRole } from "./libs/setup";

const app: Application = express();

createRole();

app.set("port", config.port);

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

export default app;
