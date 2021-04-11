const express=require("express");
const {register, login, logout, imageUpload, forgotPassword, resetPassword, editDetails}=require("../controlers/auth")
const router=express.Router();
const {errorTest,getUser}=require("../controlers/auth");
const { getAccesToRoute } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");


router.post("/register",register)
router.post("/login",login)
router.post("/upload",[getAccesToRoute,profileImageUpload.single("profile_image")],imageUpload)
router.get("/error",errorTest)
router.get("/profile",getAccesToRoute,getUser)
router.get("/logout",getAccesToRoute,logout)
router.post("/forgotpassword",forgotPassword)
router.put("/resetpassword",resetPassword);
router.put("/edit",getAccesToRoute,editDetails)



module.exports=router;