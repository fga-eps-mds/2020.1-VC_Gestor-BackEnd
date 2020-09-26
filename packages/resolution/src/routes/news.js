const express = require('express');

const newsRouter = express.Router();

newsRouter.get('/', (request, response) => response.json(
  { message: 'news page' },
));

module.exports = newsRouter;
