import UserDataSchema from "../model/userDataSchema";
import * as express from "express";

export async function updateAvatar(
  req: express.Request,
  res: express.Response
): Promise<express.Response | void> {
  try {
    console.log(req.file);
    const userId = req.body.userData.user_id;
    // Field "id" is not typed in Multer.File
    // @ts-ignore
    const { id } = req.file;
    const user = await UserDataSchema.findOneAndUpdate(
      { _id: userId },
      { avatarId: id },
      { new: true }
    );
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
}
