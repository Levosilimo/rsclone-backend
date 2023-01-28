import {
  loginUser,
  registerUser,
  verifyToken,
} from "../controllers/authController";
import * as express from "express";
import { upload } from "../model/db";
import { updateAvatar } from "../controllers/avatarController";

export const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
router.patch(
  "/avatar/upload",
  upload.single("file"),
  verifyToken,
  updateAvatar
);
