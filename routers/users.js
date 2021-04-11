const express=require("express");
const User=require("../models/User")
const { getSingleUser,getAllUsers } = require("../controlers/users");
const { chectUserExist } = require("../middlewares/database/databaseErrorhandler");
const userQueryMiddleware = require("../middlewares/query/userqueryMiddleware");
const router=express.Router();

router.get("/:id",chectUserExist,getSingleUser)
router.get("/",userQueryMiddleware(User),getAllUsers)

module.exports = router