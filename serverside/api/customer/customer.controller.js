const { 
      create,
      getcustomerByContact,
      createcustomerByContact,
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
        
        getcustomerByContact(body, (err, results) => {
            console.log(results)
            if(err){
                console.log(err);
            }
            if(!results){
        console.log("contact not mached");
                createcustomerByContact(body, (err, results) => {
                    if(results.otp){
                    if(body.otp === results.otp){
                        console.log(true)
                          const jsontoken = sign({result: results}, "qwe1234",{
                           expiresIn: "1h"
                       });
                       return res.json({ 
                           success:true,
                           message:"contact saved otp send",
                           token:jsontoken 
                       })
                   }}else{
                    const jsontoken = sign({result: results}, "qwe1234",{
                        expiresIn: "1h"
                    });
                       console.log(false)
                       return res.json({
                           success:false,
                           token:jsontoken 

                        });
                   }
                }) 
            } else{
                const jsontoken = sign({result: results}, "qwe1234",{
                    expiresIn: "1h"
                });
                return res.json({
                    success:true,
                    message:"contact matched otp send",
                    token:jsontoken 
                });
            }
            //  console.log("kkkk");
            //  console.log(body);
            //  console.log(results);
            //  const result = compareSync(body.otp, results.otp);
             
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
  