import mongoose from "mongoose";
import config from "../config";

export const connect = (url = config.dbUrl, options = {}) => {
  return mongoose.connect(process.env.MONGODB_URI || url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
};
