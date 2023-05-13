import knexConfig from '../../knexfile.js';
import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];
export default knex(config);
