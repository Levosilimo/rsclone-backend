import * as express from "express";
import * as multer from "multer";
import mongoose, { Mongoose } from "mongoose";
import { listen, MONGODB_URI } from "../index";
import { GridFsStorage } from "multer-gridfs-storage";
import { GridFSBucket } from "mongodb";
import { FileFilterCallback } from "multer";
import * as dotenv from "dotenv";
dotenv.config();

export async function connect(): Promise<Mongoose> {
  mongoose.set("strictQuery", true);
  mongoose.connection
    .on("error", console.error)
    .on("disconnected", connect)
    .on("connected", initGridFSBucket)
    .once("open", listen);
  try {
    return await mongoose.connect(MONGODB_URI, {});
  } catch (err) {
    throw err;
  }
}

export let bucket: GridFSBucket;
function initGridFSBucket(): void {
  const db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "filesBucket",
  });
}

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req: express.Request) => {
    return new Promise((resolve) => {
      const filename: string = req.body._id + "avatar";
      const fileInfo = {
        filename: filename,
        bucketName: "filesBucket",
      };
      resolve(fileInfo);
    }).catch((err) => console.error(err));
  },
});

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
