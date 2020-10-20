const express = require("express");

const NewsController = require("../controller/NewsController");

const newsRouter = express.Router();

newsRouter.post("/", NewsController.create);

module.exports = newsRouter;
