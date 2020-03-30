const { 
  createBooking,
      
  } = require("./booking.controller");
const router = require("express").Router();

router.post("/", createBooking);
module.exports = router; 
 