const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'carts', [
    { user_id: 1, product_id: 1, quantity: 1 },
    { user_id: 1, product_id: 2, quantity: 1 },
    { user_id: 1, product_id: 3, quantity: 1 },
  ]);
};
