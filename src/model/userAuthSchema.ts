import mongoose, { Schema } from "mongoose";

export interface UserAuth {
  username: string;
  email: string;
  password: string;
  token: string;
}

const UserAuthSchema = new Schema<UserAuth>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

const model = mongoose.model<UserAuth>("User", UserAuthSchema);
export const schema = model.schema;
export default model;
