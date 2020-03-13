const pool = require("../../config/database")

module.exports = { 
    create: (data, callback) => {
        pool.query(`insert into driver (email, full_name, contact_number, emergency_contact, password, address, city, state)
             values (?,?,?,?,?,?,?,?)`,
             [
                 data.email,
                 data.full_name,
                 data.contact_number,
                 data.emergency_contact,
                 data.password,
                 data.address,
                 data.city,
                 data.state
              ],
             (error, results, fields) => {
                 if(error){
                     return callback(error); 
                 } 
                 return callback(null, results)
             } 
        );
    },
    getUserByEmail:(email, callback) => {
        pool.query( 
            `SELECT * FROM driver where email =?`,
            [email],
            (error, results, fields) => {
                if(error){
                    callback(error)
                } 
                return callback(null, results[0]);
            }
        );
    }
};
