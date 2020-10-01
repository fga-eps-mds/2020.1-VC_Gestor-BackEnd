const db = require("../config/database");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const User = sequelize.define("user", 
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: "user",
    schema: "resolution"
  }
);

module.exports = User;