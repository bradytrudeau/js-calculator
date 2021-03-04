const pg = require('pg');
const Pool = pg.Pool;
require('dotenv').config();

config = {
  host: 'localhost',
  port: process.env.PGPORT, 
  database: process.env.PGDATABASE, 
  max: 10,
  idleTimeoutMillis: 30000, 
};

const pool = new Pool(config);

pool.on('connect', (client) => {
    console.log('pg connected');
})
pool.on('error', (err, client) => {
    console.log('Unexpected error on idle pg client', err);
    process.exit(-1);
});
module.exports = pool;