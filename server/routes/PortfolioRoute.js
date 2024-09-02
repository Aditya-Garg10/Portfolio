const express = require("express")
const { getData,updateIntro,updateAbout,addProject, updateProject, deleteProject, updateContact } = require("../controllers/PortfolioController")
const { adminLogin, Sendemail } = require("../controllers/UserController")


const router = express.Router()

router.get("/getPortfolioData",getData)
router.put("/updateIntro",updateIntro)
router.put("/updateAbout",updateAbout)
router.post("/addProject",addProject)
router.put("/updateProject",updateProject)
router.put("/updateContact",updateContact)
router.delete("/deleteProject/:id",deleteProject)


module.exports = router