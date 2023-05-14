const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'categories', [
    { name: 'javascript' },
    { name: 'golang' },
    { name: 'python' },
    { name: 'php' },
    { name: 'c#' },
  ]);
};
