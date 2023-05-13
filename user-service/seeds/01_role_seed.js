import insertSeedData from './abstracts/seeder';

export function seed (knex) {
  return insertSeedData(knex, 'roles', [
    { name: 'admin.farmer'},
    { name: 'admin.store'},
    { name: 'farmer'},
    { name: 'customer'},
  ]);
}
