const express = require('express');

const routes = express.Router();

const dashboardRouter = require('./dashboard.routes');
const newsRouter = require('./news.routes');
const benefitsRouter = require('./benefits.routes');
const postsRouter = require('./posts.routes');

routes.use('/dashboard', dashboardRouter);
routes.use('/news', newsRouter);
routes.use('/benefits', benefitsRouter);
routes.use('/posts', postsRouter);

module.exports = routes;
