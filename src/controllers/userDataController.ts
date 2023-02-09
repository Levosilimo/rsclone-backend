import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";
import { HydratedDocument, Types } from "mongoose";

export async function updateUserData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  try {
    const { language, records }: Partial<UserData> = req.body;
    if (!language && !records) return next();
    const userId: Types.ObjectId = req.body.userData.user_id;
    const user: HydratedDocument<UserData> =
      await UserDataSchema.findOneAndUpdate(
        { _id: userId },
        { language, records },
        { new: true }
      );
    if (!user) return res.status(401).send("Invalid Token");
    const responseBody: Partial<UserData> = {
      language: user.language,
      records: user.records,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function updateUserDataByUsername(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  try {
    const { language, records }: Partial<UserData> = req.body;
    if (!language && !records) return next();
    const username = req.params.username;
    if (!username)
      return res.status(400).send('Invalid input: "username" is required');
    const user: HydratedDocument<UserData> =
      await UserDataSchema.findOneAndUpdate(
        { username },
        { language, records },
        { new: true }
      );
    const responseBody: Partial<UserData> = {
      language: user.language,
      records: user.records,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getUserData(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const userId: Types.ObjectId = req.body.userData.user_id;
    const user: HydratedDocument<UserData> = await UserDataSchema.findOne({
      _id: userId,
    });
    if (!user) return res.status(401).send("Invalid Token");
    const responseBody: Partial<UserData> = {
      language: user.language,
      records: user.records,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getUserDataByUsername(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const username = req.params.username;
    if (!username)
      return res.status(400).send('Invalid input: "username" is required');
    if (!req.body.userData.isAdmin)
      return res.status(401).send("You don't have rights to do that");
    const user: HydratedDocument<UserData> = await UserDataSchema.findOne({
      username,
    });
    if (!user)
      return res.status(404).send('User with this "nickname" not found');
    const responseBody: Partial<UserData> = {
      language: user.language,
      records: user.records,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
