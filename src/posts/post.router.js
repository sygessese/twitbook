import { Router } from "express";
import controller from "./post.controller";

const router = Router();

// api/posts/
router
  .route("/thread/:thread_id")
  .post(controller.createPost)
  .get(controller.getPosts)
  .delete(controller.deletePost)
  .put(controller.updatePost);

// api/posts/home
router.route("/home").get(controller.getHomePage);

export default router;
