const db = require("../config/database");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(db);

const Benefit = sequelize.define("benefit", {
  benefit_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(20),
    allowNull: false
  }, 
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  redeem_way: {
    type: DataTypes.STRING(25),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  schema: "benefits",
  timestamps: false
});

module.exports = Benefit;

