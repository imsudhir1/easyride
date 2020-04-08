const { 
    enterPricing,
    getPricing,
    updateLocation,
    } = require("./pricemanagement.service");

    module.exports = {
        enterPricingDetail:(req, res) => {
        var body = req.body;
        console.log(".........");
        console.log(body);
        if(body.price_per_km && body.min_price && body.min_distance_fix_price && body.driver_commision_percent){
            enterPricing(body, (err, results) => {
              console.log(results);
            if(err){
                console.log(err);
                    return res.status(500).json({
                        success:"0",
                    }) 
              } 
            return res.status(200).json({
                success:"1",
                "message":"price detail entered"
            })
        });
    } else{
        return res.status(200).json({
            success:"0",
            message: "Fill all required field"
        })
    }
    },
    getPricingDetail:(req, res) => {
        var body=1;
        getPricing(body, (err, results) => {
              console.log(results);
            if(err){
                console.log(err);
                    return res.status(500).json({
                        success:"0",
                    }) 
              }
              if(results.id) {
            return res.status(200).json({
                success:"1",
                price_per_km:results.price_per_km.toString(),
                min_price_till_5km:results.min_price.toString(),
                min_distance_fix_price:results.min_distance_fix_price.toString()
             })
            }else{
                return res.status(200).json({
                    success:"0",
                 }) 
            }
        });
        
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