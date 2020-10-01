const express = require("express");

const routes = express.Router();

const postsRouter = require("./posts.routes");

routes.use("/posts", postsRouter);

module.exports = routes;
