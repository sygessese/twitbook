import mongoose from "mongoose";
import config from "../config";

export const connect = (url = config.dbUrl, options = {}) => {
  mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
