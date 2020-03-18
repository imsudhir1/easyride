const { 
      create,
      updateLocation,
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
    updatedLocation:(req, res) => {
        const body = req.body;
        updateLocation(body, (err, results) => {
            console.log(results);
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
     }
}