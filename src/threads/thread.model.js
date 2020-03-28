import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true
    },
    createdByUsername: String,
    comments: { type: Number, default: 0 }
  },
  { timestamps: true }
);

threadSchema.index({ name: 1 }, { unique: true });

const Thread = mongoose.model("thread", threadSchema);

export default Thread;
