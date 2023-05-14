const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'orders', [
    { address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
    { address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
    { address_id: 1, user_id: 1, coupon_id: 1, total: 1000 },
  ]);
};
