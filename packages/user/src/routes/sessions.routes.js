const { Router } = require("express");

const AuthenticateUserService = require('../controller/AuthenticateUserService');

const sessionRouter = Router();

sessionRouter.post("/", AuthenticateUserService.authenticate);

module.exports = sessionRouter;
