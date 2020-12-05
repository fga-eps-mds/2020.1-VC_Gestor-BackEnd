const express = require("express");
const routes = require("./routes");
const db = require("./config/database");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const formidable = require("formidable");
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

// app.get("/fileupload", function(req,res){
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write("<form action="fileupload" method="post" enctype="multipart/form-data">");
//     res.write("<input type="file" name="filetoupload"><br>");
//     res.write("<input type="submit">");
//     res.write("</form>");
//     res.end();
// });
// app.post("/fileupload", function(req,res){
//     var form = new formidable.IncomingForm({uploadDir: "./img"});
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.path;
//       var newpath = "./img/" + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//       });
//     });
//     res.send("ok");
// });

const options = {
  key: fs.readFileSync('/usr/src/app/news/src/key.pem'),
  cert: fs.readFileSync('/usr/src/app/news/src/cert.pem')
};

var server = https.createServer(options, app).listen(3004, function(){
  console.log("Express server listening on port " + 3004);
});


// app.listen(3004, () => {
//   //console.log("servidor rodando na porta 3004")
// });

