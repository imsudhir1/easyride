const { 
      enterPricingDetail,
      getPricingDetail,
      updateDriverLocation,
} = require("./pricemanagement.controller");
const router = require("express").Router();

router.post("/", enterPricingDetail);
router.get("/getPricingDetail", getPricingDetail);
module.exports = router; 
