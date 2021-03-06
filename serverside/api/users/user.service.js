const pool = require("../../config/database")
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());

module.exports = { 
    create: (data, callback) => {
        console.log(data.email);
        console.log('insert-data');
        console.log(data);
 
        pool.query(`insert into driver (email, full_name, contact_number, emergency_contact, password, fcm_token, address, city, state)
             values (?,?,?,?,?,?,?,?,?)`,
             [
                 data.email,
                 data.full_name,
                 data.contact_number,
                 data.emergency_contact,
                 data.password,
                 data.fcm_token,
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
    insertDriverIntoLocation: (data, returnid, callback) => {
        console.log('insert to location');
        pool.query(`insert into location (id, name, contact, emergency_contact)
             values (?,?,?,?)`,
             [
                 returnid,
                 data.full_name,
                 data.contact_number,
                 data.emergency_contact
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
    updateDriverFcmTokenIntoLocation:(fcm_token, returnid, callBack) => {
        console.log(fcm_token, returnid);
        pool.query(
            `update location set
             fcmtoken=?
             where id =?`,
             [
                 fcm_token,
                 returnid
             ],
             (error, results, fields) => {
               if (error) {
                 callBack(error);
               }
               return callBack(null, results);
             } 
        );
    },
    updateUser: (data, file, callBack) =>{

    console.log(data);
    console.log(file);
    console.log(file[0].originalname);
        pool.query(
           `update driver set
            vehicle_brand=?, 
            vehicle_number=?, 
            vehicle_model=?, 
            vehicle_year=?, 
            vehicle_color=?, 
            vehicle_image=?,
            passport_image=?,
            driver_license_back=?,
            driver_license_front=?,
            vehicle_insure_ctft=?,
            vehicle_reg_ctft=?
            where id =?`,
            [
                data.vehicle_brand,
                data.vehicle_number,
                data.vehicle_model,
                data.vehicle_year,
                data.vehicle_color,
                file[0].originalname,
                file[1].originalname,
                file[2].originalname,
                file[3].originalname,
                file[4].originalname,
                file[5].originalname,
                data.id
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            } 
        );
    } 
 
};
