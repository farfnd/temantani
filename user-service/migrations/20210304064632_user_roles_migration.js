export function up(knex) {
    return knex.schema
        .createTable('user_roles', function (table) {
            table.increments('id');
            table.integer('user_id').unsigned();
            table.integer('role_id').unsigned();

            table.foreign('user_id').references('users.id');
            table.foreign('role_id').references('roles.id');
        })
}

export function down(knex) {
    return knex.schema.dropTable("user_roles")
}
