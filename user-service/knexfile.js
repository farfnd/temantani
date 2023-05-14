// Update with your config settings.
const local = {
  client: 'postgresql',
  connection: {
    host: 'localhost', 
    database: 'user_service',
    user: 'postgres',
    password: 'farhan'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
};
const development = {
  client: 'postgresql',
  connection: {
    host: 'postgres_tt', 
    database: 'user_service',
    user: 'postgres',
    password: 'postgres'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
};
const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

export default { local, development, staging, production };
