import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { games } from "../types";

export interface UserData {
  username: string;
  language: string;
  avatarId: ObjectId;
  records: Record<games, Array<number>>;
}

const UserRecordsSchema = new Schema<Record<games, Array<number>>>({
  flexbox: { type: [Number], default: [] },
});

const UserDataSchema = new Schema<UserData>({
  username: { type: String, unique: true, required: true },
  language: { type: String, required: true, default: "en_us" },
  avatarId: {
    type: ObjectId,
  },
  records: {
    type: UserRecordsSchema,
    required: true,
    default: { flexbox: [] },
  },
});

const model = mongoose.model<UserData>("UserData", UserDataSchema);
export const schema = model.schema;
export default model;
