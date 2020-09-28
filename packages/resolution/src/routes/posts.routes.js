const express = require('express');

const PostController = require('../controller/PostController');

const postsRouter = express.Router();

postsRouter.get('/', PostController.index);

module.exports = postsRouter;
