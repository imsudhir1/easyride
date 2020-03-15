const pool = require("../../config/database")
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());

module.exports = { 
    create: (data, callback) => {
        console.log(data.email)
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
    updateUser: (data, file, callBack) =>{

    let data1 =  JSON.parse(JSON.stringify(data))
    console.log(data1);
    console.log(file);
    console.log(file[0].originalname);

        pool.query(
            `update driver set vehicle_image=?, passport_image=? where id =?`,
            [
                file[0].originalname,
                file[1].originalname,
                data1.id
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
