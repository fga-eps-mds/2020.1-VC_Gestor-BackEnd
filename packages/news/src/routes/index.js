const express = require("express");

const routes = express.Router();

const newsRouter = require("./news.routes");

routes.use("/news", newsRouter);

module.exports = routes;
