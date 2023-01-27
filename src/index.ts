import * as express from "express";
import * as dotenv from "dotenv";
import * as logger from "morgan";
import mongoose = require("mongoose");
const cors = require("cors");
import { Mongoose } from "mongoose";
import { router } from "./routes/login";

dotenv.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger("combined"));
app.use("/", router);

connect();

function listen(): void {
  app.listen(PORT);
  console.log("Server started at http://localhost:" + PORT);
}

async function connect(): Promise<Mongoose> {
  mongoose.set("strictQuery", true);
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  try {
    console.log(MONGODB_URI, PORT);
    return await mongoose.connect(MONGODB_URI, {});
  } catch (err) {
    throw err;
  }
}
