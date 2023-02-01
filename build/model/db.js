"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.upload = exports.bucket = exports.connect = void 0;
var multer = require("multer");
var mongoose_1 = require("mongoose");
var index_1 = require("../index");
var multer_gridfs_storage_1 = require("multer-gridfs-storage");
var dotenv = require("dotenv");
dotenv.config();
function connect() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoose_1["default"].set("strictQuery", true);
                    mongoose_1["default"].connection
                        .on("error", console.error)
                        .on("disconnected", connect)
                        .on("connected", initGridFSBucket)
                        .once("open", index_1.listen);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongoose_1["default"].connect(index_1.MONGODB_URI, {})];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.connect = connect;
function initGridFSBucket() {
    var db = mongoose_1["default"].connections[0].db;
    exports.bucket = new mongoose_1["default"].mongo.GridFSBucket(db, {
        bucketName: "filesBucket"
    });
}
var storage = new multer_gridfs_storage_1.GridFsStorage({
    url: process.env.MONGODB_URI,
    file: function (req) {
        return new Promise(function (resolve) {
            var filename = req.body._id + "avatar";
            var fileInfo = {
                filename: filename,
                bucketName: "filesBucket"
            };
            resolve(fileInfo);
        })["catch"](function (err) { return console.error(err); });
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype.includes("jpeg") ||
        file.mimetype.includes("png") ||
        file.mimetype.includes("jpg")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.upload = multer({ storage: storage, fileFilter: fileFilter });
//# sourceMappingURL=db.js.map