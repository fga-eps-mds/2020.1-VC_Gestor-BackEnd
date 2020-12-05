const express = require("express");

const UserController = require("../controller/UserController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = express.Router();

//usersRouter.use(ensureAuthenticated)

usersRouter.post("/user/", UserController.sendEmail);
usersRouter.post("/user/code/", UserController.checkCode);
usersRouter.post("/user/password/", UserController.changePassword);
usersRouter.post("/user/getUser/", UserController.getByToken);
usersRouter.post("/user/edit/", UserController.editUser);

module.exports = usersRouter;
