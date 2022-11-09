const {Pool} = require('pg');
const config = require('../config/config');

async function connectPostgres(){
  const pool = new Pool({
    host: config.db_host,
    user: config.db_user,
    port: config.db_port,
    password: config.db_password,
    database: config.db_name
});
  await pool.connect();
  return pool;
}


module.exports = connectPostgres;

