const express = require("express")
const  {adminLogin, Sendemail}  = require("../controllers/UserController")



const router = express.Router()

router.post("/login",adminLogin)
router.post("/send-email",Sendemail)

module.exports = router