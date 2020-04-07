const { 
      createUser,
      updateDriverLocation,
} = require("./location.controller");
const router = require("express").Router();

router.post("/", createUser);
router.patch("/", updateDriverLocation);
module.exports = router; 
