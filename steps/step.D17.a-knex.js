
/* ==========  Update config.js ========== */

'use strict';

/**
  Configure your connection string in the .env file
 
  DATABASE_URL=postgres://<username>:<password>@<server>:<port>/<database>
 
  - ElephantSQL example:  
  DATABASE_URL=postgres://iipigr:WfGNrE2xK3FQDW7@stampy.db.elephantsql.com:5432/iipgr
  
  `process.env` contains the environment variables values so,
  
  `process.env.DATABASE_URL` now points to => "postgres://iipigr:WfGNrE2xK3FQDW7@stampy.db.elephantsql.com:5432/iipgr"
*/
 
const DATABASE = process.env.DATABASE_URL || 'postgres://localhost:5432/dev-items-app';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE,
  pool: {min : 0 , max : 3},
  debug: true
};

exports.PORT = process.env.PORT || 8080; 

/*=  

/* ==========  demo in scratch.js ========== */

'use strict';

const { DATABASE, PORT } = require('./config');
const knex = require('knex')(DATABASE);

knex.select()
  .from('items')
  .limit(2)
  .debug(true)
  .then(results => console.log(results));

knex
  .insert([{ name: 'buy milk' }, { name: 'buy break' }])
  .into('items')
  .returning(['id', 'name'])
  .then(console.log);

knex('items')
  .insert({ name: 'buy coffee' })
  .returning(['id', 'name'])
  .then(console.log);

knex.select('id', 'name', 'completed')
  .from('items')
  .then(console.log);

knex.select('id', 'name', 'completed')
  .from('items')
  .where('name', 'buy coffee')
  .then(console.log);

knex.select('id', 'name', 'completed')
  .from('items')
  .where({ 'name': 'buy milk' })
  .then(console.log);

knex('items')
  .update('name', 'Buy great coffee')
  .where('name', 'buy coffee')
  .then(console.log);

knex('items')
  .where({ 'name': 'buy milk' })
  .update({
    completed: true
  })
  .then(console.log);

knex('items')
  .where('completed', true)
  .del()
  .then(console.log);