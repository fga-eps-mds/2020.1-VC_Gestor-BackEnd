const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

module.exports = {
  async AuthResolve(request) {
    const { username, password } = request.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user || user.password!==password ) {
      throw { error: "username/password incorrect!" };
    }

    // Usuário autenticado
    const token = jwt.sign({
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
    }, key);

    return ({user, token});
  }
};
