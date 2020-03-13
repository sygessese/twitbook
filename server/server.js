import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
// import { signup, signin, protect } from './utils/auth'
// import { connect } from './utils/db'
// import userRouter from './resources/user/user.router'
// import itemRouter from './resources/item/item.router'
// import listRouter from './resources/list/list.router'
import path from "path";
import { connect } from "mongoose";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.use(
  "/bundle",
  express.static(path.join(__dirname, "../client/dist/bundle.js"))
);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch {
    console.error(e);
  }
};
