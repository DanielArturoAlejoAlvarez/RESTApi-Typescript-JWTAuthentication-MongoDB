import config from "./config/config";
import express, { Application } from "express";
import morgan from "morgan";

import authRoutes from './routes/auth.routes'

const app: Application = express();

app.set("port", config.port);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

app.use('/api/auth', authRoutes)

export default app;
