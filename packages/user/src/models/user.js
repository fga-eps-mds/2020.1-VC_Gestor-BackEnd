const db = require("../config/database");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const User = sequelize.define("user", 
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "user",
    schema: "users"
});


module.exports = User;
