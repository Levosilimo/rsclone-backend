import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import UserAuthSchema, { UserAuth } from "../model/userAuthSchema";
import UserDataSchema from "../model/userDataSchema";
import { HydratedDocument } from "mongoose";

interface RegistrationCredentialsRequestBody {
  email: string;
  username: string;
  password: string;
  adminPassword?: string;
}

interface LoginCredentialsRequestBody {
  login: string;
  password: string;
  adminPassword?: string;
}

export async function loginUser(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const { login, password, adminPassword }: LoginCredentialsRequestBody =
      req.body;
    let isAdmin = false;
    if (!(login && password)) {
      return res
        .status(400)
        .send('Invalid input: "password" and "login" are required');
    } else if (adminPassword) {
      if (adminPassword !== process.env.ADMIN_PASSWORD)
        return res.status(401).send("Incorrect admin password");
      isAdmin = true;
    }
    const user: HydratedDocument<UserAuth> =
      (await UserAuthSchema.findOne({ email: login })) ||
      (await UserAuthSchema.findOne({ username: login }));
    const encryptedPassword: string = user.password;
    if (user && (await bcrypt.compare(password, encryptedPassword))) {
      const token = jwt.sign(
        { user_id: user._id, isAdmin },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_LIFETIME,
        }
      );
      res.status(200).json(token);
    } else {
      res
        .status(404)
        .send('User with this "password" and "login" was not found');
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export async function registerUser(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const {
      email,
      password,
      username,
      adminPassword,
    }: RegistrationCredentialsRequestBody = req.body;
    let isAdmin = false;
    if (!(email && password && username)) {
      return res
        .status(400)
        .send('Invalid input: "email", "password" and "username" are required');
    } else if (await UserAuthSchema.findOne({ email })) {
      return res
        .status(409)
        .send("A user with this email address already exists");
    } else if (await UserAuthSchema.findOne({ username })) {
      return res.status(422).send("Username is already taken");
    } else if (adminPassword) {
      if (adminPassword !== process.env.ADMIN_PASSWORD)
        return res.status(401).send("Invalid admin password");
      isAdmin = true;
    }
    const encryptedPassword: string = await bcrypt.hash(password, 10);
    const user: HydratedDocument<UserAuth> = await UserAuthSchema.create({
      email: email.toLowerCase(),
      username: username,
      password: encryptedPassword,
      isAdmin,
    });
    await UserDataSchema.create({
      username: username,
      _id: user._id,
    });
    const token = jwt.sign(
      { user_id: user._id, isAdmin },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_LIFETIME,
      }
    );
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.body.userData = jwt.verify(token, process.env.TOKEN_KEY);
  } catch {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
