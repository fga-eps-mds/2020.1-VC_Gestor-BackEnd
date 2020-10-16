const express = require("express");

const UserController = require("../controller/UserController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = express.Router();

//usersRouter.use(ensureAuthenticated)

usersRouter.post("/", UserController.create);
usersRouter.get("/", UserController.getByUsername);
//usersRouter.put("/:post_id", UserController.statusChange);

module.exports = usersRouter;
