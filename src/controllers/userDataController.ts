import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";

export async function updateUserData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  try {
    const userId = req.body.userData.user_id;
    const { language, levelFlexbox }: Partial<UserData> = req.body;
    if (!language && !levelFlexbox) return next();
    const user = await UserDataSchema.findOneAndUpdate(
      { _id: userId },
      { language, levelFlexbox },
      { new: true }
    );
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
    const userId = req.body.userData.user_id;
    const user = await UserDataSchema.findOne({ _id: userId });
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
