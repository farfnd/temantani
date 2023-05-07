const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'addresses', [
    { address: 'jl yg lurus', user_id: 1 },
    { address: 'jl yg benar', user_id: 1 },
    { address: 'jl in aja dulu', user_id: 1 }
  ]);
};
