const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));


module.exports = {
  async EditUserResolve(request) {
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

    console.log("oi1")

    if (user.username !== username) {

      const checkSameUsername = await User.findOne({ where: { username },});

      if (checkSameUsername) { throw { error: "Nome de usuário inválido!" };}
    }

    console.log("oi2")

    await User.update({ username, surname, name, email,}, { 
      where: { username : user.username }
    });

    console.log("oi3")

    userDB = await User.findOne({
      where: { username : user.username },
    });

    console.log("oi4")

    const newToken = jwt.sign({
      username,
      name,
      surname,
      email,
    }, key);

    console.log("oi5")

    return newToken;
    
  }
};
