const express = require('express');

const noticesRouter = express.Router();

noticesRouter.get('/', (request, response) => response.json(
  { message: 'notice page' },
));

module.exports = noticesRouter;
