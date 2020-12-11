const express = require("express");
const routes = require("./routes");
const db = require("./config/database");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const app = express();

const { Sequelize } = require("sequelize");

app.use(cors());
app.use(express.json());
app.use(routes);

const sequelize = new Sequelize(db);

// const options = {
//   key: fs.readFileSync('/usr/src/app/benefits/src/key.pem'),
//   cert: fs.readFileSync('/usr/src/app/benefits/src/cert.pem')
// };

app.listen(3003, () => {
	//console.log("Servidor rodando na porta 3003");
});

// var server = https.createServer(options, app).listen(3003, function(){
//   console.log("Express server listening on port " + 3003);
// });
