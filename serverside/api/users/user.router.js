const { createUser } = require("./user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.post("/login", );

module.exports = router;  