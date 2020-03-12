const { create } = require("./user.service");
module.exports = {
    creatUser:(req, res) => {
        const body = req.body;
         create(body, (err, results) => {
            if(err){
                Console.log(err);
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
    } 
}