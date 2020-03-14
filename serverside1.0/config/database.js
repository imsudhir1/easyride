const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'easyride_db',
    connectionLimit:10
});

module.exports = pool 
  