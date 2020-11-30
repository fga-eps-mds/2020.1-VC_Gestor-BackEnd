const User = require("../models/user");
const crypto = require("crypto");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

function sign(base64){
  
  return crypto.createHmac("sha256", key)
    .update(base64)
    .digest("hex");
}

function splitToken(token){
  const splitedToken = token.split(".");
  if(splitedToken.length!==2){
    return {
      body:{},
      valid:false
    };
  }

  return {
    body: JSON.parse((new Buffer(splitedToken[0], "base64")).toString("ascii")),
    valid: (splitedToken[1]===sign(splitedToken[0]))
  };
}

module.exports = {
  async ChangePasswordResolve(request) {

    const { newPassword, token } = request.body;

    const { body, valid } = splitToken(token);

    const user = await User.findOne({
      where: { email: body.email }
    });

    if((!valid)&&(body.operation===1)){
      throw { error: "Erro inesperado, token de troca de senha inválido! Por favor, tente novamente." };
    } else if((((new Date().getTime()) - body.date)/1000)>900){
      throw { error: "Troca de senha expirada!" };
    } else if(!user) {
      throw { error: "Este email não existe!" };
    }

    user.update({
      password:newPassword
    });

    return user;

  }
}