export function up(knex) {
  return knex.schema.createTable("categories", (table)=>{
      table.increments("id");
      table.string('name', 255).notNullable();
  })
}

export function down(knex) {
  return knex.schema.dropTable("categories")
}
