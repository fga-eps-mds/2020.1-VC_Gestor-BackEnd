const User = require("../models/user");
const authConfig = require("../config/auth");

const { sign } = require("jsonwebtoken");

module.exports = {

  // Listar todos os posts
  async authenticate(request, response) {
    const { username, password } = request.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return response.status(400).json({ error: "username/password incorrect!" });
    }

    if(password !== user.password) {
      return response.status(400).json({ error: "username/password incorrect!" });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({user}, secret, {
      expiresIn,
    });

    return response.json({user, token});
  },

};
