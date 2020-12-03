const crypto = require("crypto");
const fs = require("fs");
const { key } = JSON.parse(fs.readFileSync("./src/controller/private.json"));

function sign(base64){
  return crypto.createHmac("sha256", key)
    .update(base64)
    .digest("hex");
}

module.exports = {

  makeCode() {
    const length = 8;
    var result           = "";
    const characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  signBody(body){

    const base64 = (new Buffer.from(JSON.stringify(body)).toString("base64"));

    const hash = sign(base64);

    return `${base64}.${hash}`;
  },

  splitToken(token){
    const splitedToken = token.split(".");
    if(splitedToken.length!==2){
      return {
        body:{},
        valid:false
      };
    }

    return {
      body: JSON.parse((new Buffer.from(splitedToken[0], "base64")).toString("ascii")),
      valid: (splitedToken[1]===sign(splitedToken[0]))
    };
  },

};