const User = require("../models/user");

module.exports = {

  // Teste para criar um usuario
  async create(request, response) {
    const { user_id, name, surname, password, username } = request.body;

    const checkUserExists = await User.findOne({
      where: { username },
    });

    if (checkUserExists) {
      return response.status(400).json({ error: "Esse nome de usuário já existe!" });
    }

    const user = await User.build({
      user_id,
      name,
      surname,
      password,
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
