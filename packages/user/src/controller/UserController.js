const User = require("../models/user");
const sequelize = require("sequelize");
const { hash } = require("bcryptjs");
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

function splitToken(token){
  const splitedToken = token.split(".");
  if(splitedToken.length!==2){
    return {
      body:{},
      valid:false
    };
  }

  return {
    body: JSON.parse((new Buffer(splitedToken[0], "base64")).toString("ascii")),
    valid: (splitedToken[1]===sign(splitedToken[0]))
  };
}

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

  async changePassword(request, response) {
    const { newPassword, token } = request.body;

    const { body, valid } = splitToken(token);

    const user = await User.findOne({
      where: { email: body.email }
    });

    if((!valid)&&(body.operation===1)){
      return response.status(400).json({ error: "Erro inesperado, token de troca de senha inválido! Por favor, tente novamente." });
    } else if((((new Date().getTime()) - body.date)/1000)>900){
      return response.status(400).json({ error: "Troca de senha expirada!" });
    } else if(!user) {
      return response.status(400).json({ error: "Este email não existe!" });
    }

    user.update({
      password:newPassword
    });

    response.status(200).json({ error: "" });

  },

  async checkCode(request, response) {
    const { code, email } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ error: "Este email não existe!" });
    } else if(code!==user.coderetrieve){
      return response.status(400).json({ error: "Código incorreto" });
    } else if((((new Date().getTime()) - user.dateretrive)/1000)>900){
      return response.status(400).json({ error: "Código expirado" });
    }

    const body = {
      email,
      date: (new Date().getTime()),
      operation: 1
    };

    response.status(200).json({ token: signBody(body) });
  },

  //Mandar código via email
  async sendEmail(request, response) {
    const { email } = request.body;

    const code = makeCode();

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return response.status(400).json({ error: "Esse email não existe!" });
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
          response.status(400).json({ error});
        } else {
          response.status(200).json({ error: "", info: info.response});
        }
      });
  },
};
