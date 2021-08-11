import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import "./config/database";

function main() {
  app.listen(app.get("port"));
  console.log("Server running in port: ", app.get("port"));
}

main();
