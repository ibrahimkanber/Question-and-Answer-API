const express=require("express");
const { blockUser, deleteUser } = require("../controlers/admin");

const { getAccesToRoute, getAdminAccess } = require("../middlewares/authorization/auth");
const { chectUserExist } = require("../middlewares/database/databaseErrorhandler");
const router=express.Router();

router.use([getAccesToRoute,getAdminAccess])

router.get("/block/:id",chectUserExist,blockUser)
router.delete("/user/:id",chectUserExist,deleteUser)


module.exports = router