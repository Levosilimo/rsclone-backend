import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const UserDataSchema = new Schema({
  username: { type: String, unique: true, required: true },
  levelFlexbox: { type: Number, default: 1 },
  language: { type: String, default: "en-us" },
  avatarId: {
    type: ObjectId,
    default: "63d43be3c0ddc6e20bda87df",
  },
});

const model = mongoose.model("UserData", UserDataSchema);
export const schema = model.schema;
export default model;
