const express = require('express');

const routes = express.Router();

const dashboardRouter = require('./dashboard');
const newsRouter = require('./news');
const benefitsRouter = require('./benefits');
const noticesRouter = require('./notices');

routes.use('/dashboard', dashboardRouter);
routes.use('/news', newsRouter);
routes.use('/benefits', benefitsRouter);
routes.use('/notices', noticesRouter);

module.exports = routes;
