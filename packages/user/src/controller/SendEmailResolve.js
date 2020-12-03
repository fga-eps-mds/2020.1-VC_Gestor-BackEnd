const User = require("../models/user");
const nodemailer = require("nodemailer");
const CryptoResolve = require("../middlewares/CryptoResolve");
const sequelize = require("sequelize");
const fs = require("fs");
const { mainEmail, password } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

module.exports = {
  async SendEmailResolve(request) {

    const { email } = request.body;

    const code = CryptoResolve.makeCode();

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw { error: "Esse email não existe!" };
    }

    await User.update({
        coderetrieve:code, dateretrive: sequelize.fn("NOW")
      }, { where: { email } });

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: mainEmail,
          pass: password
        }
      });

      var mailOptions = {
        from: mainEmail,
        to: email,
        subject: "Codigo de Recuperação de Senha Vamos Cuidar",
        text: "Seu código de recuperação para o sistema vamos cuidar é: " + code.toString()
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw ({ error });
        } else {
          return ({ error: "", info: info.response});
        }
      });

  }
}