const pg = require('pg');
const Pool = pg.Pool;
require('dotenv').config();
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10, 
    idleTimeoutMillis: 30000,
  };
} else {
  config = {
    host: 'localhost',
    port: process.env.PGPORT, 
    database: process.env.PGDATABASE, 
    max: 10,
    idleTimeoutMillis: 30000, 
  };
}

const pool = new Pool(config);

pool.on('connect', (client) => {
    console.log('pg connected');
})

pool.on('error', (err, client) => {
    console.log('Unexpected error on idle pg client', err);
    process.exit(-1);
});

module.exports = pool;