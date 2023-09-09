import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    //username,description,duration,date,timeStamps
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
