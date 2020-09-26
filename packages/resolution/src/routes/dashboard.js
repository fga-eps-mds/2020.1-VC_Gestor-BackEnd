const express = require('express');

const dashboardRouter = express.Router();

dashboardRouter.get('/', (request, response) => response.json(
  { message: 'dashboard page' },
));

module.exports = dashboardRouter;
