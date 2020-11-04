const express = require("express");
const routes = require("./routes");
const db = require("./config/database");
const cors = require("cors");

const formidable = require("formidable");
var fs = require("fs");

const app = express();

const { Sequelize } = require("sequelize");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/img",express.static("./img"));

const sequelize = new Sequelize(db);

try {
    sequelize.authenticate();
    //console.log("Connection has been established successfully.");
  } catch (error) {
    //console.error("Unable to connect to the database:", error);
}

app.listen(3004, () => {
  //console.log("servidor rodando na porta 3004")
});

