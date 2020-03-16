const { 
      create,
      getUserByEmail,
      updateUser,
      updateUserLocation 
    } = require("./location.service");
    const { sign } =require("jsonwebtoken");
    const { genSaltSync, hashSync, compareSync } = require("bcrypt")

    module.exports = {
    createUser:(req, res) => {
        const body = req.body;
          create(body, (err, results) => {
              console.log(results);
            if(err){ 
                // console.log(err);
                    return res.status(500).json({
                        success:false,
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:true,
                // data:results
            })
        })
    },
    login:(req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message:"Invalid email or password"
                }) 
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, "qwe1234",{
                    expiresIn: "1h"
                });
                return res.json({
                    success:true,
                    token:jsontoken,
                    id:results.id,
                    email: results.email,
                    full_name: results.full_name,
                    contact_number: results.contact_number,
                    emergency_contact: results.emergency_contact,
                    address: results.address,
                    city: results.city,
                    state: results.state,
                    key_auth: results.key_auth
                });
            } else{
                return res.json({
                    success:false 
                 });
            }
        })
     }, 
     updateUsers:(req, res) => {
        const body = req.body;
        console.log(req.files);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateUser(body, req.files, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: false,
                    message: "failed to update user"
                });
            } else{
            return res.json({
                success: true,
                message: "updated successfully"
            });
        }
        });
     },
     updatedUserLocation:(req, res) => {
        const body = req.body;
        console.log(body)
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateUserLocation(body, (err, results) => {
            if(err){
                console.log(err); 
                return;
            }
            if(!results){
                return res.json({
                    success: false,
                    message: "failed to update location"
                });
            } else{
            return res.json({
                success: true,
                message: "Location updated successfully"
            });
         }
        });
    },
    createUserl:(req, res) => {
        const body = req.body;
          createl(body, (err, results) => {
              console.log(results);
            if(err){
                // console.log(err);
                    return res.status(500).json({
                        success:false,
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:true,
                // data:results
            })
        })
    }
}