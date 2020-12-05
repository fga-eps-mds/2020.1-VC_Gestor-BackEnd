const User = require("../models/user");
const jwt = require("jsonwebtoken");


module.exports = {
  async EditUserResolve(request) {
    const fs = require("fs");
    const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));
    const { token, username, surname, name, email } = request.body;

    const user = jwt.verify(token, key);

    // TODO: O problema passa se colocar uma string vazia
    // sendo assim, a validação está incompleta. 
    // -------------------------------------------------------------------------
    // if((username===undefined)||(surname===undefined)||(name===undefined)||(email===undefined)){
    //   throw { error: "Preencha os espaços corretamente!" };
    // }
    // -------------------------------------------------------------------------

    var userDB = await User.findOne({where: { username : user.username },});

    if (user.username !== username) {

      const checkSameUsername = await User.findOne({ where: { username },});

      if (checkSameUsername) { throw { error: "Nome de usuário inválido!" };}
    }

    await User.update({ username, surname, name, email,}, { 
      where: { username : user.username }
    });

    userDB = await User.findOne({
      where: { username : user.username },
    });

    const newToken = jwt.sign({
      username: userDB.username,
      name: userDB.name,
      surname: userDB.surname,
      email: userDB.email,
    }, key);

    return newToken;
    
  }
};
