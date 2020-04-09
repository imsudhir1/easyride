const { createPool } = require('mysql');

const pool = createPool({
    host: 'easyride.cvjw9w2oarkh.us-east-2.rds.amazonaws.com',
    user:'easyride',
    password:'easyride',
    database: 'easyride',
    connectionLimit:10
});

module.exports = pool 
  
