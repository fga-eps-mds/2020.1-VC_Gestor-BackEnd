const express = require('express');

const benefitsRouter = express.Router();

benefitsRouter.get('/', (request, response) => response.json(
  { message: 'benefits page' },
));

module.exports = benefitsRouter;
