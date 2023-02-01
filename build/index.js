"use strict";
exports.__esModule = true;
exports.listen = exports.MONGODB_URI = exports.PORT = void 0;
var express = require("express");
var dotenv = require("dotenv");
dotenv.config();
var logger = require("morgan");
var cors = require("cors");
var router_1 = require("./routes/router");
var db_1 = require("./model/db");
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
logger.token("body", function (req) { return JSON.stringify(req.body); });
app.use(logger(":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"));
app.use("/", router_1.router);
function listen() {
    app.listen(exports.PORT);
    console.log("Server started at http://localhost:" + exports.PORT);
}
exports.listen = listen;
(0, db_1.connect)();
//# sourceMappingURL=index.js.map