import UserDataSchema, { UserData } from "../model/userDataSchema";
import * as express from "express";
import { bucket } from "../model/db";
import { HydratedDocument } from "mongoose";
import { GridFSFile } from "mongodb";

export async function updateAvatar(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const userId = req.body.userData.user_id;
    // Field "id" is not typed in Multer.File
    // @ts-ignore
    const { id } = req.file;
    await UserDataSchema.findOneAndUpdate(
      { _id: userId },
      { avatarId: id },
      { new: true }
    );
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function getAvatar(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    const username: string = req.params.username;
    if (!username)
      return res.status(400).send('Invalid input: "username" is required');
    const user: HydratedDocument<UserData> = await UserDataSchema.findOne({
      username: username,
    });
    if (!user) return res.status(404).send("User with sent username not found");
    const files: GridFSFile[] = await bucket
      .find({ _id: user.avatarId })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "User doesn't have avatar",
      });
    }
    bucket.openDownloadStream(user.avatarId).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
