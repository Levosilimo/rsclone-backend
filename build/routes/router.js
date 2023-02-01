import {
    checkEmailEligibility,
    checkUsernameEligibility,
    loginUser,
    registerUser,
    verifyToken,
} from "../controllers/userAuthController.js";
import * as express from "express";
import { upload } from "../model/db.js";
import {
    getAvatar,
    updateAvatar,
    updateAvatarByUsername,
} from "../controllers/userAvatarController.js";
import {
    getUserData,
    getUserDataByUsername,
    updateUserData,
    updateUserDataByUsername,
} from "../controllers/userDataController.js";
import { getUsersRecords } from "../controllers/userRecordsController.js";

export const router = express.Router();

/* Auth handlers */
router.post("/login", loginUser);
router.post(
    "/register",
    checkEmailEligibility(false),
    checkUsernameEligibility(false),
    registerUser
);
router.post("/register/check-username", checkUsernameEligibility(true));
router.post("/register/check-email", checkEmailEligibility(true));

/* User's user avatar handlers */
router.patch(
    "/avatar",
    // We need this check to stop unauthenticated users from uploading images to the server
    verifyToken(false),
    upload.single("file"),
    // Body gets empty after multer processing, so we need to get the id from the token again
    verifyToken(false),
    updateAvatar
);
router.get("/avatar/:username", getAvatar);

/* Admin's user avatar handlers */
router.patch(
    "/avatar/:username",
    // We need this check to stop unauthenticated users from uploading images to the server
    verifyToken(true),
    upload.single("file"),
    // Body gets empty after multer processing, so we need to get the id from the token again
    verifyToken(true),
    updateAvatarByUsername
);

/* User's user data handlers */
router.patch("/user", verifyToken(false), updateUserData, getUserData);
router.get("/user", verifyToken(false), getUserData);

/* Admin's user data handlers */
router.patch(
    "/user/:username",
    verifyToken(true),
    updateUserDataByUsername,
    getUserDataByUsername
);
router.get("/user/:username", verifyToken(true), getUserDataByUsername);

router.get("/records", verifyToken(false), getUsersRecords);