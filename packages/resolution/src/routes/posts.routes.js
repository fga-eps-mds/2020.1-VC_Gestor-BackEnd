const express = require("express");

const PostController = require("../controller/PostController");

const postsRouter = express.Router();

postsRouter.get("/", PostController.index);
postsRouter.get("/:post_id", PostController.postById);
postsRouter.put("/:post_id", PostController.statusChange);
postsRouter.post("/graph/", PostController.graphPosts);
postsRouter.post("/graphStatus/", PostController.graphStatusPosts);

module.exports = postsRouter;