const pool = require("../../config/database")
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json())
app.use(cors());

module.exports = { 
    enterPricing: (data, callback) => {
        console.log('insert-data');
        console.log(data);
        pool.query(`insert into price_commission_mgmt (price_per_km, min_price, min_distance_fix_price, driver_commision_percent)
             values (?,?,?,?)`,
                [ 
                data.price_per_km,
                data.min_price,
                data.min_distance_fix_price,
                data.driver_commision_percent
                ],
             (error, results, fields) => {
                 if(error){
                     return callback(error); 
                 } 
                 return callback(null, results)
             } 
        );
    },
    getPricing:(id, callback) => {
        pool.query( 
            `SELECT * FROM price_commission_mgmt where id=?`,
            [id],
            (error, results, fields) => { 
                if(error){
                    callback(error)
                } 
                return callback(null, results[0]);
            }
        );
    },
    
    updateLocation: (data, availability, callBack) =>{
    // console.log(data);
         pool.query(`update location set
            longitude=?, 
            latitude=?, 
            address=?,
            availability=? 
            where id =?`, 
            [
            data.longitude,
            data.latitude,
            data.address,
            availability,
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
