import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Username
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "Username must have 3 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
