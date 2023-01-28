import * as express from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import UserAuthSchema from "../model/userAuthSchema";
import UserDataSchema from "../model/userDataSchema";

interface RegistrationCredentialsRequestBody {
  email: string;
  username: string;
  password: string;
}

interface LoginCredentialsRequestBody {
  login: string;
  password: string;
}

export async function loginUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const { login, password }: LoginCredentialsRequestBody = req.body;
    if (!(login && password)) {
      res
        .status(400)
        .send('Invalid input: "password" and "login" are required');
      return;
    }
    const user =
      (await UserAuthSchema.findOne({ email: login })) ||
      (await UserAuthSchema.findOne({ username: login }));
    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = jwt.sign(
        { user_id: user._id, password },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_LIFETIME,
        }
      );
      res.status(200).json(user.token);
    } else {
      res
        .status(404)
        .send('User with this "password" and "login" was not found');
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export async function registerUser(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const { email, password, username }: RegistrationCredentialsRequestBody =
      req.body;
    if (!(email && password && username)) {
      res
        .status(400)
        .send('Invalid input: "email", "password" and "username" are required');
      return;
    } else if (await UserAuthSchema.findOne({ email: email })) {
      res.status(409).send("A user with this email address already exists");
      return;
    } else if (await UserAuthSchema.findOne({ username: username })) {
      res.status(422).send("Username is already taken");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserAuthSchema.create({
      email: email.toLowerCase(),
      username: username,
      password: encryptedPassword,
    });
    UserDataSchema.create({
      username: username,
      _id: user._id,
    });
    user.token = jwt.sign(
      { user_id: user._id, encryptedPassword },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_LIFETIME,
      }
    );
    res.status(201).json(user.token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
}

export function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.body.userData = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
