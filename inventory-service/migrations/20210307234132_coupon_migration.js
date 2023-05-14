export function up(knex) {
  return knex.schema.createTable("coupons", function(table){
      table.increments('id');
      table.string("code", 100).unique().notNullable();
      table.string('description', 255);
      table.integer('percentage');
      table.integer('fixedDiscount');
  })
}

export function down(knex) {
  return knex.schema.dropTable("coupons")
}
