export function up(knex) {
    return knex.schema.createTable("order_details", function(table){
        table.increments('id');
        table.integer('order_id').notNullable();
        table.foreign('order_id').references('orders.id')       
        table.integer('cart_id').notNullable();
        table.foreign('cart_id').references('carts.id')
    })
}
  
export function down(knex) {
  return knex.schema.dropTable("order_details")
}
