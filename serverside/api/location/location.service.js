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
        pool.query(`insert into location (id, longitude, latitude, address)
             values (?,?,?,?)`,
                [ 
                data.id,
                data.longitude,
                data.latitude,
                data.address
                ],
             (error, results, fields) => {
                 if(error){
                     return callback(error); 
                 } 
                 return callback(null, results)
             } 
        );
    },
    updateLocation: (data, callBack) =>{
    // console.log(data);
         pool.query(`update location set
            longitude=?, 
            latitude=?, 
            address=? 
            where id =?`, 
            [
            data.longitude,
            data.latitude,
            data.address,
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