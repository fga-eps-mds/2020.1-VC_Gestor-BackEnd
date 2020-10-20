const express = require("express");

const UserController = require("../controller/UserController");
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = express.Router();

//usersRouter.use(ensureAuthenticated)

usersRouter.post("/", UserController.create);
usersRouter.post("/id", UserController.getByUsername);


module.exports = usersRouter;