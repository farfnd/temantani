const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');

const secret = config.jwtSecret;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, secret);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const generateJwt = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: '24h',
  });
};

const verifyJwt = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { hashPassword, comparePassword, generateJwt, verifyJwt };
