const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'order_details', [
    { order_id: 1, cart_id: 1 },
    { order_id: 1, cart_id: 1 },
    { order_id: 1, cart_id: 1 },
  ]);
};
