const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const fs = require("fs");
const { key, mainEmail, password } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

function makeCode() {
  const length = 8;
  var result           = "";
  const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function sign(base64){
  return crypto.createHmac("sha256", key)
    .update(base64)
    .digest("hex");
}

function signBody(body){

  const base64 = (new Buffer(JSON.stringify(body)).toString("base64"));

  const hash = sign(base64);

  return `${base64}.${hash}`;
}

module.exports = {
  async SendEmailResolve(request) {

    const { email } = request.body;

    const code = makeCode();

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      throw { error: "Esse email não existe!" };
    }

    await user.update({coderetrieve:code, dateretrive: sequelize.fn("NOW")});

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