const User = require("../models/user");
const jwt = require("jsonwebtoken");



module.exports = {
  async GetUserByTokenResolve(request) {
    const fs = require("fs");
    const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));
    const { token } = request.body;

    let user = jwt.verify(token, key);

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