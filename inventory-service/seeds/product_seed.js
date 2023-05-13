const insertSeedData = require('./abstracts/seeder');

exports.seed = function (knex) {
  return insertSeedData(knex, 'products', [
    { title: 'ini title', description: "ini desc", price: 100000, image: "https://placeimg.com/480/480/tech" },
    { title: 'ini title2', description: "ini desc", price: 100000, image: "https://placeimg.com/480/480/tech" },
    { title: 'ini title2', description: "ini desc", price: 100000, image: "https://placeimg.com/480/480/tech" },
  ]);
};
