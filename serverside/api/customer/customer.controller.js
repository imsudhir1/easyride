const { 
      create,
      getcustomerByContact,
      createcustomerByContact,
      updatecustomer,
      updateCustomerOtp,
      driverList,
      updateCustomerLocation,
      updatecustomerLocation 
    } = require("./customer.service");
    const { sign } =require("jsonwebtoken");
    const { genSaltSync, hashSync, compareSync } = require("bcrypt")
    const pool = require("../../config/database")

    module.exports = {
    createcustomer:(req, res) => {
        const body = req.body;
        const salt = genSaltSync(10); 
        body.password = hashSync(body.password, salt);
          create(body, (err, results) => {
              console.log(results.insertId);
            if(err){ 
                // console.log(err);  
                    return res.status(500).json({
                        success:"0",
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:"1",
                return_id:results.insertId
                // data:results
            })
        })
    },
    login:(req, res) => { 
        console.log("...................../");
        const body = req.body;
        console.log(req.body); 
        if(body.contact){ 
        getcustomerByContact(body, (err, results) => {
            if(err){
                console.log(err);
            } 
            if(!results){
            console.log("contact not mached");
            var generateOtp = Math.floor(1000 + Math.random() * 9000);
                createcustomerByContact(body, generateOtp, (err, results) => {
                console.log(results);
                console.log("lllllllll");
                    if(results.affectedRows){
                      
                       return res.json({ 
                           success:"1",
                           message:"contact saved otp send",
                           otp:generateOtp 
                       })
                   }else{
                       return res.json({
                           success:"0",
                        });
                   }
                }) 
            } else{ 
                console.log("update otp part//////////");
                var otp = Math.floor(1000 + Math.random() * 9000);
                updateCustomerOtp(body, otp, (err, results) => {
                        console.log(results);
                        console.log("......///////");
                        if(err){
                            console.log(err);
                            return;
                        }
                        if(results.affectedRows){
                            getcustomerByContact(body, (err, results) => {
                                console.log(">>>>>>>");
                                console.log(results);
                                console.log(">>>>>>>");
                                if(err){
                                    console.log(err);
                                } 
                            if(!results.otp){
                                return res.json({
                                    success:"0",
                                    message:"otp not found"
                                });
                            } else{
                                return res.json({
                                    success:"1",
                                    otp:results.otp,
                                    message:"contact matched otp send"
                                });
                            }                            
                          });
                        } else{
                                return res.json({
                                    success:"0",
                                    message:"otp not updated"
                                });
                              } 
                    });
                 
            }
        })
    }else{
        return res.json({
            success:"0",
            message:"contact required"
        });
    }
     },
     verify:(req, res) => {
         var getBody = req.body;
         console.log(getBody);
        getcustomerByContact(getBody, (err, results) => {
            console.log(results)
            if(err){
                console.log(err);
            }
            if(results.otp===getBody.otp){
            const jsontoken = sign({result: results}, "qwe1234",{
                expiresIn: "1h"
            });
            return res.json({
                success:"1", 
                token:jsontoken,
                message:"Otp verified"
            });
        }else{
            return res.json({
                success:"0",
                message:"Wrong otp"
            });
        }
        })
     
      },
      searchDriver:(req, res) => {
        const body = req.body;
        // console.log(body);
        if(body.contact && body.pickup && body.dropl){
        updateCustomerLocation(body, (err, results) => {
            // console.log(results.affectedRows);
            if(err){
                console.log(err);
                return;
            }
            if(!results.affectedRows){
                return res.json({
                    success: "0",
                    message: "failed to update user"
                });
            } else{
                driverList(body, (err, results) => {
                    // console.log(body);
                    // console.log(results);
                    function getDistance(clat1, clon1, dlat2, dlon2, unit) {
                        if ((clat1 == dlat2) && (clon1 == dlon2)) {
                            return 0;
                        }
                        else {
                            var radlat1 = Math.PI * clat1/180;
                            var radlat2 = Math.PI * dlat2/180;
                            var theta = clon1-dlon2;
                            var radtheta = Math.PI * theta/180;
                            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                            if (dist > 1) {
                                dist = 1;
                            }
                            dist = Math.acos(dist);
                            dist = dist * 180/Math.PI;
                            dist = dist * 60 * 1.1515;
                            if (unit=="K") { dist = dist * 1.609344 }
                            if (unit=="N") { dist = dist * 0.8684 }
                            return dist;
                        }
                    }
                    console.log('.......'); 

                    // var returned_data =Array;
                    var returned_data = [];
                    var vvv="jjjjjjjjjjjjjjjjjjjj";
                   var bb= getcustomerByContact(body, (err, results) => {
                        if(err){
                            console.log(err);
                        } 
                        // console.log(driver.id); 
                    var plat = results.plat;
                    var plong = results.plong;
                        // var distance= getDistance(driver.latitude, driver.longitude, results.plat, results.plong)/0.6217;
                        // console.log(plong);
                    }); 
                    results.forEach(driver => {
                    //    getDistance(element.latitude, element.longitude, dlat2, dlon2, unit);
                    // var returned_data1 = getcustomerByContact(body, (err, results) => {
                    //     if(err){
                    //         console.log(err);
                    //     } 
                    //     // console.log(driver.id); 
                    //     var key = driver.id;
                    //     var distance= getDistance(driver.latitude, driver.longitude, results.plat, results.plong)/0.6217;
                    //     var getDistanceString= distance.toString().concat("|").concat(key);
                    //     returned_data.push(getDistanceString);
                    //     returned_data = returned_data.sort();
                    //     console.log(returned_data);
                    //     console.log(".............>>>");
                    //     return returned_data
                    // }); 
                        var key = driver.id;
                        console.log(body);
                    var distance= getDistance(driver.latitude, driver.longitude, body.plat, body.plong)/0.6217;
                        var getDistanceString= distance.toString().concat("|").concat(key);
                        returned_data.push(getDistanceString);
                        returned_data = returned_data.sort();
                    });
                    console.log(returned_data);
                    if(err){
                        console.log(err);
                        return;
                    }
                    return res.json({
                        success: "1",
                        driverData:returned_data[0],
                        message: "searching.."
                    }); 
                }); 
        } 
        });
    }else{
        return res.json({
            success: "0",
            message: "Fill all required field"
        });
    }
     },
     updatecustomers:(req, res) => {
        const body = req.body;
        console.log(req.files);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updatecustomer(body, req.files, (err, results) => {
            if(err){ 
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: "0",
                    message: "failed to update customer"
                });
            } else{
            return res.json({
                success: "1",
                message: "updated successfully"
            });
        }
        });
     }
}
  