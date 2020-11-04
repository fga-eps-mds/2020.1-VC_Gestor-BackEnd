const express = require("express");

const UserController = require("../controller/UserController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = express.Router();

//usersRouter.use(ensureAuthenticated)

usersRouter.post("/", UserController.create);
usersRouter.post("/id", UserController.getByUsername);
usersRouter.post("/user/", UserController.sendEmail);
usersRouter.post("/user/code/", UserController.checkCode);
usersRouter.post("/user/password/", UserController.changePassword);


module.exports = usersRouter;
