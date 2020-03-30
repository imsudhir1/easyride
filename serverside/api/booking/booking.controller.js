const { 
    create,
    } = require("./booking.service");
    const pool = require("../../config/database")
    module.exports = {
    createBooking:(req, res) => {
        const body = req.body;
          create(body, (err, results) => {
              console.log(results); 
            if(err){ 
                console.log(err);  
                    return res.status(500).json({
                        success:"0",
                        message:"db connection error"
                    }) 
              }
            return res.status(200).json({
                success:"1"
            })
        })
    },
     updatecustomers:(req, res) => {
        const body = req.body;
        console.log(req.files);
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
  