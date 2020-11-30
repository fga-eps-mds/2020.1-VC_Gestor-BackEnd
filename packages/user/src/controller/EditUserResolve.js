const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

module.exports = {
  async EditUserResolve(request) {
    const { token, username, surname, name, email } = request.body;

    let user;

    let a = jwt.verify(token, key, function(err, decoded) {
      if (err){
        throw ({ "auth": false, "message": "Token Inválido, por favor faça login novamente." });
      }
      user = decoded;
    });

    if((username===undefined)||(surname===undefined)||(name===undefined)||(email===undefined)){
      throw { error: "Preencha os espaços corretamente!" };
    }
    
    const userDB = await User.findOne({
      where: { username : user.username },
    });

    if (user.username !== username) {

      const checkSameUsername = await User.findOne({
        where: { username : username },
      });

      if (checkSameUsername) {
        throw { error: "Nome de usuário inválido!" };
      }

    }

    await userDB.update({
      username,
      surname,
      name,
      email,
    });

    const newToken = jwt.sign({
      username: userDB.username,
      name: userDB.name,
      surname: userDB.surname,
      email: userDB.email,
    }, key);

    return newToken;
    
  }
}