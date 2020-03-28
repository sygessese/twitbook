import { Router } from "express";
import controller from "./thread.controller";

const router = Router();

// api/threads/
router
  .route("/")
  .get(controller.getThreads)
  .post(controller.createThread)
  .put(controller.updateThread)
  .delete(controller.deleteThread);

export default router;
