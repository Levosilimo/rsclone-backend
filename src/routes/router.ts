import {
  checkEmailEligibility,
  checkUsernameEligibility,
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/userAuthController";
import * as express from "express";
import { upload } from "../model/db";
import {
  getAvatar,
  processAvatar,
  updateAvatar,
  updateAvatarByUsername,
} from "../controllers/userAvatarController";
import {
  getUserData,
  getUserDataByUsername,
  updateUserData,
  updateUserDataByUsername,
} from "../controllers/userDataController";
import { getUsersRecords } from "../controllers/userRecordsController";
import {
  addLevel,
  getLevel,
  getLevelTotalCount,
} from "../controllers/levelDataController";

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
  verifyToken(false, false),
  upload.single("file"),
  processAvatar,
  // Body gets empty after multer processing, so we need to get the id from the token again
  verifyToken(false, false),
  updateAvatar
);
router.get("/avatar/:username", getAvatar);

/* Admin's user avatar handlers */
router.patch(
  "/avatar/:username",
  // We need this check to stop unauthenticated users from uploading images to the server
  verifyToken(true, false),
  upload.single("file"),
  processAvatar,
  // Body gets empty after multer processing, so we need to get the id from the token again
  verifyToken(true, false),
  updateAvatarByUsername
);

/* User's user data handlers */
router.patch("/user", verifyToken(false, false), updateUserData, getUserData);
router.get("/user", verifyToken(false, false), getUserData);

/* Admin's user data handlers */
router.patch(
  "/user/:username",
  verifyToken(true, false),
  updateUserDataByUsername,
  getUserDataByUsername
);
router.get("/user/:username", verifyToken(true, false), getUserDataByUsername);

router.get("/records", verifyToken(false, false), getUsersRecords);

router.get("/levels/:game", verifyToken(false, false), getLevelTotalCount);
router.get("/levels/:game/:level", verifyToken(false, false), getLevel);
//router.post("/levels", addLevel);

router.get("/check-auth", verifyToken(false, true));
