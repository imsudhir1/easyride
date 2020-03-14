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
    },
    updateUser: (data, callBack) =>{
        console.log(data);
        pool.query(
            `update driver set vehicle_brand=?, vehicle_number=?, vehicle_model=?, vehicle_year=?, vehicle_color=?, vehicle_image=?, passport_image=?, driver_license_back=?, driver_license_front=?, vehicle_insure_ctft=?, vehicle_reg_ctft=? where id =?`,
            [
                data.vehicle_brand,
                data.vehicle_number,
                data.vehicle_model,
                data.vehicle_year,
                data.vehicle_color,
                data.vehicle_image,
                data.passport_image,
                data.driver_license_back,
                data.driver_license_front,
                data.vehicle_insure_ctft,
                data.vehicle_reg_ctft,
                data.id
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results[0]);
            } 
        );
    }
};
