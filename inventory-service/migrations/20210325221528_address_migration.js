export function up(knex) {
    return knex.schema.createTable("addresses", function(table){
        table.increments('id');
        table.string('address').notNullable();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('users.id')
    })
}
  
export function down(knex) {
  return knex.schema.dropTable("addresses")
}
