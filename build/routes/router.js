"use strict";
exports.__esModule = true;
exports.router = void 0;
var userAuthController_1 = require("../controllers/userAuthController");
var express = require("express");
var db_1 = require("../model/db");
var userAvatarController_1 = require("../controllers/userAvatarController");
var userDataController_1 = require("../controllers/userDataController");
var userRecordsController_1 = require("../controllers/userRecordsController");
exports.router = express.Router();
/* Auth handlers */
exports.router.post("/login", userAuthController_1.loginUser);
exports.router.post("/register", (0, userAuthController_1.checkEmailEligibility)(false), (0, userAuthController_1.checkUsernameEligibility)(false), userAuthController_1.registerUser);
exports.router.post("/register/check-username", (0, userAuthController_1.checkUsernameEligibility)(true));
exports.router.post("/register/check-email", (0, userAuthController_1.checkEmailEligibility)(true));
/* User's user avatar handlers */
exports.router.patch("/avatar/", 
// We need this check to stop unauthenticated users from uploading images to the server
(0, userAuthController_1.verifyToken)(false), db_1.upload.single("file"), 
// Body gets empty after multer processing, so we need to get the id from the token again
(0, userAuthController_1.verifyToken)(false), userAvatarController_1.updateAvatar);
exports.router.get("/avatar/:username", userAvatarController_1.getAvatar);
/* Admin's user avatar handlers */
exports.router.patch("/avatar/:username", 
// We need this check to stop unauthenticated users from uploading images to the server
(0, userAuthController_1.verifyToken)(true), db_1.upload.single("file"), 
// Body gets empty after multer processing, so we need to get the id from the token again
(0, userAuthController_1.verifyToken)(true), userAvatarController_1.updateAvatarByUsername);
/* User's user data handlers */
exports.router.patch("/user", (0, userAuthController_1.verifyToken)(false), userDataController_1.updateUserData, userDataController_1.getUserData);
exports.router.get("/user", (0, userAuthController_1.verifyToken)(false), userDataController_1.getUserData);
/* Admin's user data handlers */
exports.router.patch("/user/:username", (0, userAuthController_1.verifyToken)(true), userDataController_1.updateUserDataByUsername, userDataController_1.getUserDataByUsername);
exports.router.get("/user/:username", (0, userAuthController_1.verifyToken)(true), userDataController_1.getUserDataByUsername);
exports.router.get("/records", (0, userAuthController_1.verifyToken)(false), userRecordsController_1.getUsersRecords);
//# sourceMappingURL=router.js.map