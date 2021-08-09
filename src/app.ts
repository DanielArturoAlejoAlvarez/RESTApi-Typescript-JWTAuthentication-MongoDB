import config from "./config/config";
import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

app.set("port", config.port);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

export default app;
