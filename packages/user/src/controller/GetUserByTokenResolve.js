const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));


module.exports = {
  async GetUserByTokenResolve(request) {
    const { token } = request.body;

    let user;

    console.log("aids");

    let a = jwt.verify(token, key, function(err, decoded){
      if (err) {
        throw ({ "auth": false, "message": "Token Inválido, por favor faça login novamente." });
      }
      user = decoded;
    });

    console.log("aids2");

    const userDB = await User.findOne({
      where: { username : user.username },
    });

    if (!userDB) {
      throw { error: "Token Inválido, por favor faça login novamente." };
    }

    const userResponse = {
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
    }

    return userResponse;
    
  }
}