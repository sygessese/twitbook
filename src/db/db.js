import mongoose from "mongoose";
import config from "../config";
import "dotenv";

export const connect = (url = config.dbUrl, options = {}) => {
  mongoose.connect(process.env.MONGODB_URI || url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};
