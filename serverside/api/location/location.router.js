const { 
      createUser,
      updatedLocation,
} = require("./location.controller");
const router = require("express").Router();

router.post("/", createUser);
router.patch("/", updatedLocation);
module.exports = router; 
