const db = require("../config/database");

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(db);

const Votes = sequelize.define('votes', 
  {
    like_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'post',
          schema: 'resolution'
        },
        key: 'post_id'
      }
    },
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'user',
          schema: 'resolution'
        },
        key: 'user_id'
      }
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'votes',
    schema: 'resolution'
  }
);

module.exports = Votes;
