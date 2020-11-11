const express = require("express");

const NewsController = require("../controller/NewsController");

const newsRouter = express.Router();

newsRouter.get("/", NewsController.getAllNews);
newsRouter.post("/", NewsController.create);

newsRouter.get("/:news_id", NewsController.getNewsById);
newsRouter.put("/:news_id", NewsController.putNewsById);
newsRouter.patch("/:news_id", NewsController.patchNewsById);

newsRouter.delete("/:news_id", NewsController.deleteNewsById);

module.exports = newsRouter;
