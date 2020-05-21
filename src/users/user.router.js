import { Router } from "express";
import controller from "./user.controller";

const router = Router();

// api/users/

router
  .route("/")
  .post(controller.createUser)
  .put(controller.updateUser)
  .delete((req, res) => {
    res.send({ message: `update user ${req.body.id}` });
  });

// find many by username contains
router.route("/search/:query").get((req, res) => {
  res.send({ message: `looking for ${req.params.query}` });
});

// find one by id, update user followers to include this user, update this users following to include it as well
router.route("/follow/:user").put(controller.followUser);
router.route("/home/:offset/:lastId").get(controller.getHomePage);
router.route("/updatehome").put(controller.filterUserFeed);

export default router;
