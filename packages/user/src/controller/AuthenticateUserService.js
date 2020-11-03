const User = require("../models/user");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const fs = require("fs");

const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

module.exports = {

  // Listar todos os posts
  async authenticate(request, response) {
    const { username, password } = request.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return response.status(400).json({ error: "username/password incorrect!" });
    } else if(user.password!==password) {
      return response.status(400).json({ error: "username/password incorrect!" });
    }

    // Usuário autenticado

    const token = sign({
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
    }, key);

    return response.json({user, token});
  },

};
