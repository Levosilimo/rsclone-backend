import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface UserData {
  username: string;
  levelFlexbox: number;
  language: string;
  avatarId: ObjectId;
}

const UserDataSchema = new Schema<UserData>({
  username: { type: String, unique: true, required: true },
  levelFlexbox: { type: Number, required: true, default: 1 },
  language: { type: String, required: true, default: "en_us" },
  avatarId: {
    type: ObjectId,
  },
});

const model = mongoose.model<UserData>("UserData", UserDataSchema);
export const schema = model.schema;
export default model;
