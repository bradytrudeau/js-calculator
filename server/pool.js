const pg = require('pg');
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
    port: 5432, 
    database: 'js-calculator', 
    max: 10, 
    idleTimeoutMillis: 30000, 
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

pool.on('connect', (client) => {
    console.log('pg connected');
})
pool.on('error', (err, client) => {
    console.log('Unexpected error on idle pg client', err);
    process.exit(-1);
});
module.exports = pool;