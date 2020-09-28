const db = require("../config/database");

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(db);

const Place = sequelize.define('place', 
  {
    place_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    place_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'place',
    schema: 'resolution'
  }
);

module.exports = Place;
