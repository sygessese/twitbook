import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    replies: [
      {
        type: new mongoose.Schema(
          {
            text: String,
            createdBy: {
              type: mongoose.SchemaTypes.ObjectId,
              ref: "user",
              required: true
            }
          },
          { timestamps: true }
        )
      }
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    thread: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "thread",
      required: true
    }
  },
  { timestamps: true }
);

//itemSchema.index({ list: 1, name: 1 }, { unique: true })

const Post = mongoose.model("post", postSchema);

export default Post;
