import mongoose, { Schema } from "mongoose";

export interface UserAuth {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserAuthSchema = new Schema<UserAuth>({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

const model = mongoose.model<UserAuth>("User", UserAuthSchema);
export const schema = model.schema;
export default model;
