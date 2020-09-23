const express = require('express') 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://developer:developer@172.23.0.2:5432/dev_database')

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();

app.listen(3000, () => console.log('servidor rodando na porta 3000'));