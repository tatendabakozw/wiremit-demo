// src/models/User.ts
import mongoose, { Schema, InferSchemaType, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema>;

// ⬇️ Type the model with <UserDoc>
const User = (models.User as mongoose.Model<UserDoc>) || model<UserDoc>("User", UserSchema);
export default User;
