const pool = require("../../config/database")
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());

module.exports = { 
    create: (data, callback) => {
        console.log('insert-data');
        console.log(data);
       
              pool.query(`insert into booking (customer_contact, driver_contact, start_address, end_address) select c.contact, d.contact_number, d.address, d.city from customer c,driver d where c.contact = contact and d.id = id
              values (?,?)`,
              [
              data.customer_contact,
              data.driver_id
              ],
             (error, results, fields) => {
                 if(error){ 
                     return callback(error);
                 } 
                 return callback(null, results)
             } 
        );
    },
    updateCustomerOtp: (data, otp, callback) => {
        console.log(data);
        pool.query(
            `update customer set 
             otp=?
             where contact=?`,
             [ 
                otp,
                data.contact
             ],
            (error, results, fields) => { 
                if(error){
                    return callback(error); 
            } 
                  return callback(null, results)
             } 
        );
    },
    updateCustomerLocation:(data, callback)=>{
        pool.query(
            `update customer set
             plat=?,
             plong=?,
             dlat=?,
             dlong=?, 
             pickup=?,
             dropl=?
             where contact=?`,
             [ 
                 data.plat,
                 data.plong,
                 data.dlat,
                 data.dlong,
                data.pickup,
                data.dropl,
                data.contact
             ],
            (error, results, fields) => { 
                if(error){
                    return callback(error); 
            } 
                  return callback(null, results)
             } 
        );
    },
    
}; 
