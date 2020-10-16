const express = require("express");

const routes = express.Router();

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

module.exports = routes;
