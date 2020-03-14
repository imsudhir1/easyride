const { 
      createUser,
      login,
      updateUsers 
} = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.post("/login", login);
router.patch("/", updateUsers);

module.exports = router;  