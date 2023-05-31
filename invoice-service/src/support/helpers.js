const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = "$2b$10$OstRst1LWEfDyKEGdKcOKO";

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

function generateInvoiceId() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const invoiceId = `INV/${datePart}/${randomString}`;

  return invoiceId;
}

module.exports = { hashPassword, comparePassword, generateJwt, verifyJwt, generateInvoiceId };
