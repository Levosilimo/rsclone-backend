import * as express from "express";
import { Request, Response } from "express";
import mongoose = require("mongoose");
const cors = require("cors");
import { Mongoose } from "mongoose";

const { PORT = 9000, MONGODB_URL = "mongodb://localhost:27017/MyDb" } =
  process.env;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world",
  });
});

connect().then(listen);

function listen(): void {
  app.listen(PORT);
  console.log("Server started at http://localhost: " + PORT);
}

async function connect(): Promise<Mongoose> {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  try {
    return await mongoose.connect(MONGODB_URL, {});
  } catch (err) {
    throw err;
  }
}
