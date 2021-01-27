import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import { signup, login, protect } from "./auth";
import usersRouter from "./users/user.router";
import postsRouter from "./posts/post.router";
import threadsRouter from "./threads/thread.router";
import path from "path";
import { connect } from "./db/db";
import favicon from "serve-favicon";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/login", login);
app.post("/signup", signup);

// app.use('/api', protect);
app.use("/api/posts", [protect, postsRouter]);
app.use("/api/users", [protect, usersRouter]);
app.use("/api/threads", [protect, threadsRouter]);

app.use(
  favicon(path.join(__dirname, "../client", "dist", "favicon", "favicon.ico"))
);
app.use(
  "/bundle",
  express.static(path.join(__dirname, "../client/dist/bundle.js"))
);
app.use("/*", express.static(path.join(__dirname, "../client/dist")));

export const start = async () => {
  try {
    await connect();
    app.listen(process.env.PORT || config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (e) {
    console.error(e);
  }
};
