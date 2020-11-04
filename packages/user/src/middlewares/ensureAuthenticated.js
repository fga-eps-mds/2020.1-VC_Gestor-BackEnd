const { Request, Response, NextFunction } = require("express");
const { verify } = require("jsonwebtoken");

const authConfig = require("../config/auth");

module.exports = function ensureAuthenticated(
  request = Request,
  response = Response,
  next = NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    //console.log(decoded);
    return next();
  } catch (err) {
    throw new Error("Invalid JWT token");
  }
};