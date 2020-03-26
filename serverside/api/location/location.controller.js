const { 
      create,
      updateLocation,
    } = require("./location.service");

    module.exports = {
    createUser:(req, res) => {
        const body = req.body;
          create(body, (err, results) => {
              console.log(results);
            if(err){ 
                console.log(err);
                    return res.status(500).json({
                        success:"0",
                    }) 
              }
            return res.status(200).json({
                success:"1",
                // data:res
            })
        })
    },
    updatedLocation:(req, res) => {
        const body = req.body;
        console.log(body);
        if(body.id && body.fcmtoken && body.longitude && body.latitude && body.address){
        updateLocation(body, (err, results) => {
            console.log(results);
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: "0",
                    message: "failed to update user"
                });
            } else{
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