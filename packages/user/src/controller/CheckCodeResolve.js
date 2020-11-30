const User = require("../models/user");
const crypto = require("crypto");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

function sign(base64){
  return crypto.createHmac("sha256", key)
    .update(base64)
    .digest("hex");
}

function signBody(body){

  const base64 = (new Buffer(JSON.stringify(body)).toString("base64"));

  const hash = sign(base64);

  return `${base64}.${hash}`;
}

module.exports = {
  async CheckCodeResolve(request) {

    const { code, email } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw { error: "Este email não existe!" };
    } else if(code!==user.coderetrieve){
      throw { error: "Código incorreto" };
    } else if((((new Date().getTime()) - user.dateretrive)/1000)>900){
      throw { error: "Código expirado" };
    }

    const body = {
      email,
      date: (new Date().getTime()),
      operation: 1
    };

    return { token: signBody(body) };

  }
}