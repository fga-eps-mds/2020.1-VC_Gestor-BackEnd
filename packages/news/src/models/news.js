const db = require("../config/database");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const dataTypes = DataTypes;

  const News = sequelize.define("new", 
    {
      news_id: {
        primaryKey: true,
        type: dataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      title: {
        type: dataTypes.STRING(25),
        allowNull: false
      },
      subtitle: {
        type: dataTypes.STRING(25),
        allowNull: false
      },
      text: {
        type: dataTypes.STRING(500),
        allowNull: false
      },
      image1: {
        type: dataTypes.STRING(50),
        allowNull: false
      },
      image2: {
        type: dataTypes.STRING(50),
        allowNull: false
      },
      image3: {
        type: dataTypes.STRING(50),
        allowNull: false
      },
      post_id: {
        type: dataTypes.STRING(25),
        allowNull: true,
      },
    }, {
      sequelize,
      schema: "news"
  });


module.exports = News;
