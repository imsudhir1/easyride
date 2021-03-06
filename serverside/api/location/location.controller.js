const { 
      create,
      updateLocation,
    } = require("./location.service");

    module.exports = {
    createUser:(req, res) => {
        var body = req.body;
        console.log(".........");
        console.log(body);
        if(body.id && body.full_name && body.contact_number && body.longitude && body.latitude && body.address && body.fcmtoken){
          create(body, (err, results) => {
            //   console.log(results);
            if(err){ 
                console.log(err);
                    return res.status(500).json({
                        success:"0",
                    }) 
              } 
            return res.status(200).json({
                success:"1"
            })
        });
    } else{
        return res.status(200).json({
            success:"0",
            message: "Fill all required field"
        })
    }
    },
    updateDriverLocation:(req, res) => {
        const body = req.body;
        console.log(body);
        if(body.id && body.longitude && body.latitude && body.address){
            var availability = 1;
        updateLocation(body, availability, (err, results) => {
            console.log(results);
            if(err){
                console.log(err);
                return;
            }
            if(!results.affectedRows){
                return res.json({
                    success: "0",
                    message: "failed to update user"
                });
            }
            else{
            return res.json({
                success: "1",
                message: "updated successfully"
            });
        } 
        });
    }else{
        return res.json({
            success: "0",
            message: "Fill all required field"
        });
    }
     }
} 