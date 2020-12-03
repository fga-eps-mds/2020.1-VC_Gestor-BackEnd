const User = require("../models/user");
const { signBody } = require("../middlewares/CryptoResolve");

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
