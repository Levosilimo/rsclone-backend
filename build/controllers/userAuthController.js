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
exports.verifyToken = exports.checkEmailEligibility = exports.checkUsernameEligibility = exports.registerUser = exports.loginUser = void 0;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var userAuthSchema_1 = require("../model/userAuthSchema");
var userDataSchema_1 = require("../model/userDataSchema");
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, login, password, adminPassword, isAdmin, user, _b, encryptedPassword, _c, token, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    _a = req.body, login = _a.login, password = _a.password, adminPassword = _a.adminPassword;
                    isAdmin = false;
                    if (!(login && password)) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Invalid input: "password" and "login" are required')];
                    }
                    else if (adminPassword) {
                        if (adminPassword !== process.env.ADMIN_PASSWORD)
                            return [2 /*return*/, res.status(401).send("Incorrect admin password")];
                        isAdmin = true;
                    }
                    return [4 /*yield*/, userAuthSchema_1["default"].findOne({ email: login })];
                case 1:
                    _b = (_d.sent());
                    if (_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, userAuthSchema_1["default"].findOne({ username: login })];
                case 2:
                    _b = (_d.sent());
                    _d.label = 3;
                case 3:
                    user = _b;
                    encryptedPassword = user.password;
                    _c = user;
                    if (!_c) return [3 /*break*/, 5];
                    return [4 /*yield*/, bcrypt.compare(password, encryptedPassword)];
                case 4:
                    _c = (_d.sent());
                    _d.label = 5;
                case 5:
                    if (_c) {
                        user.update({ isAdmin: isAdmin });
                        token = jwt.sign({ user_id: user._id, isAdmin: isAdmin }, process.env.TOKEN_KEY, {
                            expiresIn: process.env.TOKEN_LIFETIME
                        });
                        res.status(200).json(token);
                    }
                    else {
                        res
                            .status(404)
                            .send('User with this "password" and "login" was not found');
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _d.sent();
                    console.error(error_1);
                    res.status(500).send("Server error");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, username, adminPassword, isAdmin, encryptedPassword, user, token, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, email = _a.email, password = _a.password, username = _a.username, adminPassword = _a.adminPassword;
                    isAdmin = false;
                    if (!(email && password && username)) {
                        return [2 /*return*/, res
                                .status(400)
                                .send('Invalid input: "email", "password" and "username" are required')];
                    }
                    else if (adminPassword) {
                        if (adminPassword !== process.env.ADMIN_PASSWORD)
                            return [2 /*return*/, res.status(401).send("Invalid admin password")];
                        isAdmin = true;
                    }
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 1:
                    encryptedPassword = _b.sent();
                    return [4 /*yield*/, userAuthSchema_1["default"].create({
                            email: email.toLowerCase(),
                            username: username,
                            password: encryptedPassword,
                            isAdmin: isAdmin
                        })];
                case 2:
                    user = _b.sent();
                    return [4 /*yield*/, userDataSchema_1["default"].create({
                            username: username,
                            _id: user._id
                        })];
                case 3:
                    _b.sent();
                    token = jwt.sign({ user_id: user._id, isAdmin: isAdmin }, process.env.TOKEN_KEY, {
                        expiresIn: process.env.TOKEN_LIFETIME
                    });
                    res.status(201).json(token);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error(error_2);
                    res.status(500).send("Server error");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.registerUser = registerUser;
function checkUsernameEligibility(autonomous) {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var username, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    username = req.body.username;
                    if (!!username) return [3 /*break*/, 1];
                    return [2 /*return*/, res.status(400).send('Invalid input: "username" is required')];
                case 1: return [4 /*yield*/, userAuthSchema_1["default"].findOne({ username: username })];
                case 2:
                    if (_a.sent()) {
                        return [2 /*return*/, res.status(422).send("Username is already taken")];
                    }
                    _a.label = 3;
                case 3:
                    if (!autonomous)
                        return [2 /*return*/, next()];
                    res.end();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error(error_3);
                    res.status(500).send("Server error");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
}
exports.checkUsernameEligibility = checkUsernameEligibility;
function checkEmailEligibility(autonomous) {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var email, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    email = req.body.email;
                    if (!!email) return [3 /*break*/, 1];
                    return [2 /*return*/, res.status(400).send('Invalid input: "email" is required')];
                case 1: return [4 /*yield*/, userAuthSchema_1["default"].findOne({ email: email })];
                case 2:
                    if (_a.sent()) {
                        return [2 /*return*/, res
                                .status(409)
                                .send("A user with this email address already exists")];
                    }
                    _a.label = 3;
                case 3:
                    if (!autonomous)
                        return [2 /*return*/, next()];
                    res.end();
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error(error_4);
                    res.status(500).send("Server error");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
}
exports.checkEmailEligibility = checkEmailEligibility;
function verifyToken(verifyAdmin) {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var token, userData;
        return __generator(this, function (_a) {
            token = req.body.token || req.query.token || req.headers["x-access-token"];
            if (!token) {
                return [2 /*return*/, res.status(403).send("A token is required for authentication")];
            }
            try {
                userData = jwt.verify(token, process.env.TOKEN_KEY);
                if (userData.user_id === undefined || userData.isAdmin === undefined) {
                    return [2 /*return*/, res.status(401).send("Invalid Token")];
                }
                if (verifyAdmin && !userData.isAdmin)
                    return [2 /*return*/, res.status(401).send("You don't have rights to do that")];
                req.body.userData = userData;
            }
            catch (_b) {
                return [2 /*return*/, res.status(401).send("Invalid Token")];
            }
            return [2 /*return*/, next()];
        });
    }); };
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=userAuthController.js.map