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
      type: dataTypes.STRING(64),
      allowNull: false
    },
    username: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
    coderetrieve: {
      type: dataTypes.STRING(10),
      allowNull: false
    },
    dateretrive: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(25),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "user",
    schema: "users"
});


module.exports = User;
