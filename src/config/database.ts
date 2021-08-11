//import config from "./config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/example', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((db) => console.log("DB is connect!!"))
  .catch((err) => console.log(err));
