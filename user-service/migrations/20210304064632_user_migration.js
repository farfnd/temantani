export function up(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('email', 255).unique().notNullable();
            table.string('password', 255).notNullable();
            table.string('phone', 17).notNullable();
        })
}

export function down(knex) {
    return knex.schema
        .dropTable("users")
}
