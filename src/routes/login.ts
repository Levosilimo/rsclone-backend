import { loginUser, registerUser } from "../controllers/loginController";
import * as express from "express";

export const router = express.Router();
router.post("/login", loginUser);
router.post("/register", registerUser);
