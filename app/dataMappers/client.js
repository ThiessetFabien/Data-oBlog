const { Pool } = require('pg');

// https://node-postgres.com/apis/client
// https://node-postgres.com/apis/pool

const pool = new Pool();

module.exports = pool;