const express = require("express");

const routes = express.Router();

const benefitsRouter = require("./benefits.routes");

routes.use("/benefits", benefitsRouter);
routes.use("/benefits/:benefit_id", benefitsRouter);

module.exports = routes;