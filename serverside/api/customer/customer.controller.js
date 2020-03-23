const { 
      create,
      getcustomerByContact,
      createcustomerByContact,
      updatecustomer,
      updateCustomerOtp,
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
            
            return res.json({
                success:"1",
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
  