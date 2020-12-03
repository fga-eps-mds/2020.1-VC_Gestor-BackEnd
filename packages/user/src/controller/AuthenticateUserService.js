const { AuthResolve } = require("./AuthResolve");

module.exports = {

  // Listar todos os posts
  async authenticate(request, response) {
    try {
      const authToken = await AuthResolve(request);

      return response.json(authToken);
    } catch (err) {
      return response.status(404).json(err);
    }
  },

};
