const { GetUserByTokenResolve } = require("./GetUserByTokenResolve");
const { EditUserResolve } = require("./EditUserResolve");
const { ChangePasswordResolve } = require("./ChangePasswordResolve");
const { CheckCodeResolve } = require("./CheckCodeResolve");
const { SendEmailResolve } = require("./SendEmailResolve");

module.exports = {

  // Adquirir um usuário por token
  async getByToken(request, response) {

    try {
      const user = await GetUserByTokenResolve(request);
      return response.json(user);
    } catch (erro) {
      return response.status(404).json(erro);
    }
  },

  // Editar usúario
  async editUser(request, response) {
    
    try {
      const newToken = await EditUserResolve(request);
      return response.status(200).json({ error: "", newToken });
    } catch(err) {
      return response.status(404).json(err);
    }
  },

  async changePassword(request, response) {
    try {
      
      const user = await ChangePasswordResolve(request);
      response.json({ error: "" });
      // response.status(200).json({ error: "" });
    } catch (err) {
      return response.status(404).json(err);
    }

  },

  async checkCode(request, response) {
    try {
      const token = await CheckCodeResolve(request);
      response.status(200).json(token);
    } catch (err) {
      return response.status(404).json(err);
    }
  },

  //Mandar código via email
  async sendEmail(request, response) {
    try {
      const info = await SendEmailResolve(request);
      return response.json(info);
    } catch (err) {
      return response.status(404).json(err);
    }
  },
};
