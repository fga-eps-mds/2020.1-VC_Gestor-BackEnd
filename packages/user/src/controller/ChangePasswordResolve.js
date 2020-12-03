const User = require("../models/user");
const CryptoResolve = require("../middlewares/CryptoResolve");

module.exports = {
  async ChangePasswordResolve(request) {

    const { newPassword, token } = request.body;

    const { body, valid } = CryptoResolve.splitToken(token);

    var user = await User.findOne({
      where: { email: body.email }
    });

    if((!valid)&&(body.operation===1)){
      throw { error: "Erro inesperado, token de troca de senha inválido! Por favor, tente novamente." };
    } else if((((new Date().getTime()) - body.date)/1000)>900){
      throw { error: "Troca de senha expirada!" };
    } else if(!user) {
      throw { error: "Este email não existe!" };
    }

    User.update({
      password: newPassword
    }, { 
      where: { 
        email: body.email 
      }
    });

    user = await User.findOne({
      where: { email: body.email }
    });

    return user;

  }
}
