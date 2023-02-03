import * as express from "express";
import * as sharp from "sharp";
import UserDataSchema, { UserData } from "../model/userDataSchema";
import { Readable } from "stream";
import { avatarStorage, bucket } from "../model/db";
import { HydratedDocument } from "mongoose";
import { GridFSFile } from "mongodb";

export async function updateAvatar(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    // Field "id" is not typed in Multer.File
    // @ts-ignore
    const id = req.body.avatarId;
    const userId = req.body.userData.user_id;
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

export async function updateAvatarByUsername(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    // Field "id" is not typed in Multer.File
    // @ts-ignore
    const id = req.body.avatarId;
    const username = req.params.username;
    if (username) {
      await UserDataSchema.findOneAndUpdate(
        { username },
        { avatarId: id },
        { new: true }
      );
    } else return res.status(400).send('Invalid input: "username" is required');
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
    if (!user)
      return res.status(404).send('User with this "username" not found');
    const files: GridFSFile[] = await bucket
      .find({ _id: user.avatarId })
      .toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "User does not have an avatar",
      });
    }
    bucket.openDownloadStream(user.avatarId).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

export async function processAvatar(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response | void> {
  try {
    const file = req.file;
    const buffer = file.buffer;
    sharp(buffer)
      .resize(192, 192, { fit: "contain", background: "#fff" })
      .flatten({ background: "#fff" })
      .jpeg({ quality: 50 })
      .toBuffer((err, data) => {
        const fileStream = Readable.from(data);
        avatarStorage.fromStream(fileStream, req, file).then((data) => {
          req.body.avatarId = data.id;
          next();
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
