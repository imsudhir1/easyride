const { 
      createUser,
      login,
      updateUsers,
      docUpload,
      updatedUserLocation,
      createUserl
} = require("./location.controller");
const router = require("express").Router();
const multer=require('multer')
const upload =multer({dest:'./uploads'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
router.post("/", createUser);
router.post("/login", login);
router.patch("/", upload.any(), updateUsers);
router.patch("/updatedUserLocation", updatedUserLocation);
router.post("/createUserl", createUserl);
module.exports = router; 
