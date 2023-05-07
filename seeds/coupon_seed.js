const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'coupons', [
    { code: 'AKHIRTAHUN', description: "lorem", percentage: 0, fixedDiscount: 10000 },
    { code: 'AKHIRBULAN', description: "lorem", percentage: 10, fixedDiscount: 0 },
    { code: 'RAMADHAN', description: "lorem", percentage: 0, fixedDiscount: 10000 }
  ]);
};
