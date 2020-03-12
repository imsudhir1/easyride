const { 
      create,
      getUserByEmail 
    } = require("./user.service");
    const { sign } =require("jsonwebtoken");

module.exports = {
    createUser:(req, res) => {
        const body = req.body;
          create(body, (err, results) => {
            if(err){
                console.log(err);
                    return res.status(500).json({
                        success:0,
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:0,
                data:results
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
                   

        })
     }
    }
 