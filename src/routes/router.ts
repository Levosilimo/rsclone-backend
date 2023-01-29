import {
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/userAuthController";
import * as express from "express";
import { upload } from "../model/db";
import { getAvatar, updateAvatar } from "../controllers/userAvatarController";
import { getUserData, updateUserData } from "../controllers/userDataController";

export const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch(
  "/avatar/upload",
  // We need this check to stop unauthenticated users from uploading images to the server
  verifyToken,
  upload.single("file"),
  // Body gets empty after multer processing, so we need to get the id from the token again
  verifyToken,
  updateAvatar
);
router.get("/avatar/:username", getAvatar);
router.patch("/user", verifyToken, updateUserData, getUserData);
router.get("/user", verifyToken, getUserData);
