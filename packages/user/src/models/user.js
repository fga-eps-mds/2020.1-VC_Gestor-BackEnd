const db = require("../config/database");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const dataTypes = DataTypes;

const User = sequelize.define("user", 
  {
    userid: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
    surname: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(60),
      allowNull: false
    },
    username: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "user",
    schema: "users"
});


module.exports = User;
