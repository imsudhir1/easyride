const { 
      create,
      getcustomerByContact,
      updatecustomer,
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
                        success:false,
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:true,
                return_id:results.insertId
                // data:results
            })
        })
    },
    login:(req, res) => { 
        console.log(".....................")
        const body = req.body;
        console.log(req.body);
        
        getcustomerByContact(body.contact, (err, results) => {
            console.log(results)
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message:"Invalid contact or otp"
                }) 
            }
            const result = compareSync(body.otp, results.otp);
            console.log(result);
            if(result){
                results.otp = undefined;
                const jsontoken = sign({result: results}, "qwe1234",{
                    expiresIn: "1h"
                });
                return res.json({
                    success:true
                });
            } else{
                return res.json({
                    success:false 
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
                    success: false,
                    message: "failed to update customer"
                });
            } else{
            return res.json({
                success: true,
                message: "updated successfully"
            });
        }
        });
     }
}
  