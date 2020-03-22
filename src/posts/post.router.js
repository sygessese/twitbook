import { Router } from "express";
import controller from "./post.controller";

const router = Router();

// api/posts/
router
  .route("/")
  .post(controller.createOne)
  .get((req, res) => {
    res.send({ message: `here are posts in thread: ${req.params.thread}` });
  });

// api/posts/:user/home
router.route("/home").get(controller.getHomePage);

export default router;
