import knex from 'knex'; // Import the Knex instance

const insertSeedData = (knex, tableName, rows) => {
    return knex(tableName)
        .del()
        .then(() => {
            // Generate an array of insert queries for each row
            const insertQueries = rows.map((row, index) => {
                const { id, ...attributes } = row; // Exclude the "id" property
                return knex(tableName).insert({ id: index + 1, ...attributes });
            });

            // Execute all insert queries using a single transaction
            return knex.transaction((trx) => {
                const promises = insertQueries.map((query) => query.transacting(trx));
                return Promise.all(promises).then(trx.commit).catch(trx.rollback);
            });
        });
};
export default insertSeedData;
