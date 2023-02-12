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
}

export async function loginUser(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    if (!("login" in req.body && "password" in req.body)) {
      return res
        .status(400)
        .send('Invalid input: "password" and "login" are required');
    }
    const { login, password }: LoginCredentialsRequestBody = req.body;
    const user: HydratedDocument<UserAuth> =
      (await UserAuthSchema.findOne({ email: login })) ||
      (await UserAuthSchema.findOne({ username: login }));
    if (user) {
      const encryptedPassword: string = user.password;
      if (await bcrypt.compare(password, encryptedPassword)) {
        const token = jwt.sign(
          { user_id: user._id, isAdmin: user.isAdmin },
          process.env.TOKEN_KEY,
          {
            expiresIn: process.env.TOKEN_LIFETIME,
          }
        );
        const responseBody: LoginResponseBody = {
          username: user.username,
          email: user.email,
          token,
        };
        res.status(200).json(responseBody);
      } else {
        res
          .status(404)
          .send('User with this "password" and "login" was not found');
        return;
      }
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

const MAIL_REGEXP =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

interface LoginResponseBody {
  token: string;
  username: string;
  email: string;
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
    } else if (!MAIL_REGEXP.test(email))
      return res.status(400).send("Invalid email");
    else if (password.length < 6)
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    else if (adminPassword) {
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
    const token: string = jwt.sign(
      { user_id: user._id, isAdmin },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_LIFETIME,
      }
    );
    const responseBody: LoginResponseBody = { username, email, token };
    res.status(201).json(responseBody);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export function checkUsernameEligibility(autonomous: boolean) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const username: string = req.body.username;
      if (!username) {
        return res.status(400).send('Invalid input: "username" is required');
      } else if (await UserAuthSchema.findOne({ username })) {
        return res.status(422).send("Username is already taken");
      }
      if (!autonomous) return next();
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
}

export function checkEmailEligibility(autonomous: boolean) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    try {
      const email: string = req.body.email;
      if (!email) {
        return res.status(400).send('Invalid input: "email" is required');
      } else if (await UserAuthSchema.findOne({ email })) {
        return res
          .status(409)
          .send("A user with this email address already exists");
      }
      if (!autonomous) return next();
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
}

interface TokenPayload {
  user_id: string;
  isAdmin: boolean;
}

export function verifyToken(requireAdmin: boolean, autonomous: boolean) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const userData: TokenPayload = jwt.verify(token, process.env.TOKEN_KEY);
      if (userData.user_id === undefined || userData.isAdmin === undefined) {
        return res.status(401).send("Invalid Token");
      }
      if (requireAdmin && !userData.isAdmin)
        return res.status(401).send("You don't have rights to do that");
      req.body.userData = userData;
    } catch {
      return res.status(401).send("Invalid Token");
    }
    if (autonomous) return res.status(200).end();
    return next();
  };
}
