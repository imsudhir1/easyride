const pool = require("../../config/database")

module.exports = { 
    create: (data, callback) => {
        pool.query(
            `insert into driver (email_id, full_name, contact_number, emergency_contact, password, address, city, state, key_auth)
             values (?,?,?,?,?,?,?,?,?)`,
             [
                 data.email_id,
                 data.full_name,
                 data.contact_number,
                 data.emergency_contact,
                 data.password,
                 data.address,
                 data.city,
                 data.state,
                 data.key_auth
             ],
             (error, results, fields) => {
                 if(error){
                     return callback(error); 
                 } return callback(null, results)
             } 
        );
    }
};
