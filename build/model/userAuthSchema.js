import mongoose, { Schema } from "mongoose";
const UserAuthSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
});
const model = mongoose.model("User", UserAuthSchema);
export const schema = model.schema;
export default model;