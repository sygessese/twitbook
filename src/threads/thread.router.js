import { Router } from "express";
import controller from "./thread.controller";

const router = Router();

// api/threads/
router
  .route("/")
  .get(controller.getThreads)
  .post(controller.createThread)
  .put((req, res) => {
    res.send({ message: "thread renamed" });
  })
  .delete((req, res) => {
    res.send({ message: "thread deleted" });
  });

export default router;
