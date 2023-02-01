import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import logger from "morgan";
import cors from "cors";
import { router } from "./routes/router.js";
import { connect } from "./model/db.js";

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
logger.token("body", (req) => JSON.stringify(req.body));
app.use(
    logger(
        ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
    )
);
app.use("/", router);
export function listen() {
    app.listen(PORT);
    console.log("Server started at http://localhost:" + PORT);
}
connect();