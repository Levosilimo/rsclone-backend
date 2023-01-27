import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

const model = mongoose.model("User", UserSchema);
export const schema = model.schema;
export default model;
