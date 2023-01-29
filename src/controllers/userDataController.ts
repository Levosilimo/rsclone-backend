import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";
import { HydratedDocument, Types } from "mongoose";

export async function updateUserData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  try {
    const { language, levelFlexbox }: Partial<UserData> = req.body;
    if (!language && !levelFlexbox) return next();
    let user: HydratedDocument<UserData>;
    if (req.body.username) {
      if (!req.body.userData.isAdmin)
        return res.status(401).send("You don't have rights to do that");
      const username = String(req.body.username);
      user = await UserDataSchema.findOneAndUpdate(
        { username },
        { language, levelFlexbox },
        { new: true }
      );
    } else {
      const userId: Types.ObjectId = req.body.userData.user_id;
      user = await UserDataSchema.findOneAndUpdate(
        { _id: userId },
        { language, levelFlexbox },
        { new: true }
      );
    }
    const responseBody: Partial<UserData> = {
      language: user.language,
      levelFlexbox: user.levelFlexbox,
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
    let user: HydratedDocument<UserData>;
    if (req.body.username) {
      if (!req.body.userData.isAdmin)
        return res.status(401).send("You don't have rights to do that");
      const username = String(req.body.username);
      user = await UserDataSchema.findOne({ username });
      if (!user)
        return res.status(404).send('User with this "nickname" not found');
    } else {
      const userId: Types.ObjectId = req.body.userData.user_id;
      user = await UserDataSchema.findOne({ _id: userId });
    }
    const responseBody: Partial<UserData> = {
      language: user.language,
      levelFlexbox: user.levelFlexbox,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
