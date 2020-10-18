const User = require("../models/user");
const { hash } = require("bcryptjs");

module.exports = {

  // Teste para criar um usuario
  async create(request, response) {
    const { userid, name, surname, password, username } = request.body;

    const checkUserExists = await User.findOne({
      where: { username },
    });

    if (checkUserExists) {
      return response.status(400).json({ error: "Esse nome de usuário já existe!" });
    }

    const hashedPassword = await hash(password, 8);

    const user = await User.build({
      userid,
      name,
      surname,
      password: hashedPassword,
      username
    });

    await user.save();

    return response.json(user);
  },

  // Adquirir um usuário por username
  async getByUsername(request, response) {
    const { username } = request.body;

    const checkUserExists = await User.findOne({
      where: { username },
    });

    if (!checkUserExists) {
      return response.status(400).json({ error: "Esse nome de usuário não existe!" });
    }

    return response.json(checkUserExists);
  },
};
