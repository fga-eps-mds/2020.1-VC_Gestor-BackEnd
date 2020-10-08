const express = require("express");
const routes = require("./routes");
const db = require("./config/database");
const cors = require("cors");

const app = express();

const { Sequelize } = require("sequelize");

app.use(cors());
app.use(express.json());
app.use(routes);

const sequelize = new Sequelize(db);

try{
	sequelize.authenticate();
	//console.log("Connection has been established successfully.");
}catch(error){
	//console.error("Unable to connect to the database:", error);
}

app.listen(3003, () => {
	//console.log("Servidor rodando na porta 3003");
});