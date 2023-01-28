import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import * as logger from "morgan";
const cors = require("cors");
import { router } from "./routes/router";
import { connect } from "./model/db";

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(express.json());
logger.token("body", (req) => JSON.stringify(req.body));
app.use(
  logger(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);
app.use("/", router);
export function listen(): void {
  app.listen(PORT);
  console.log("Server started at http://localhost:" + PORT);
}
connect();
