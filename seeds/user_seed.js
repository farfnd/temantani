const insertSeedData = require('./abstracts/seeder');
const { hashPassword } = require("../src/utils");

exports.seed = function (knex) {
  return insertSeedData(knex, 'users', [
    { name: 'admin', email: 'admin@admin.com', password: hashPassword('password'), phone: '081234567890' },
    { name: 'john', email: 'john@admin.com', password: hashPassword('password'), phone: '081234567890' },
    { name: 'budi', email: 'budi@admin.com', password: hashPassword('password'), phone: '081234567890' },
  ]);
};
