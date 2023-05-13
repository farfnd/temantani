import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const getRoleIdByName = async (knex, roleName) => {
  const role = await knex('roles').where({ name: roleName }).first();
  return role ? role.id : null;
};

export { hashPassword, comparePassword, generateJwt, verifyJwt, getRoleIdByName };
