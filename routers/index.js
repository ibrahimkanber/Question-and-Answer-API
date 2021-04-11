const express=require("express")
const question=require("./question");
const auth=require("./auth")
const users=require("./users")
const admin=require("./admin")



const router=express.Router();
router.use("/questions",question)
router.use("/auth",auth)
router.use("/users",users)
router.use("/admin",admin)

module.exports=router;