const express = require("express");
const { addAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer,editAnswer, deleteAnswer, likeAnswer,undolikeQuestion} = require("../controlers/answer");
const router = express.Router({mergeParams:true})
const {getAccesToRoute, getAnswerOwnerAccess}=require("../middlewares/authorization/auth")
const {checkQuestionAndAnswerExist}=require("../middlewares/database/databaseErrorhandler")

router.post("/",getAccesToRoute,addAnswerToQuestion)
router.get("/",getAllAnswersByQuestion)
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer)
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccesToRoute,getAnswerOwnerAccess],editAnswer)
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccesToRoute,getAnswerOwnerAccess],deleteAnswer)
router.get("/:answer_id/like",[checkQuestionAndAnswerExist,getAccesToRoute],likeAnswer)
router.get("/:answer_id/undolike",[checkQuestionAndAnswerExist,getAccesToRoute],undolikeQuestion)
module.exports = router