const { 
      create,
      getUserByEmail,
      updateUser,
      updateUserLocation 
    } = require("./location.service");

    module.exports = {
    createUser:(req, res) => {
        const body = req.body;
          create(body, (err, results) => {
            //   console.log(results);
            if(err){ 
                console.log(err);
                    return res.status(500).json({
                        success:false,
                    }) 
              }
            return res.status(200).json({
                success:true,
                // data:res
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
        updateUser(body, (err, results) => {
            console.log(results.message.changed);
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