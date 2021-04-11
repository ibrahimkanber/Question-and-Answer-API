const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion, editQuestion, deleteQuestion, likeQuestion, undolikeQuestion } = require("../controlers/question");
const { getAccesToRoute, getQuestionOwnerAccess } = require("../middlewares/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorhandler");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware");

const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware");
const Question = require("../models/Question");
const answer = require("./answer")
const router = express.Router();

router.post("/ask", getAccesToRoute, askNewQuestion)
router.get("/allquestions", questionQueryMiddleware(Question, {
    population: {
        path: "user",
        select: "name profile_image"
    }
}), getAllQuestions)
router.get("/:id", checkQuestionExist,answerQueryMiddleware(Question,{
        population:[
            {
                path:"user",
                select:"name profile_image"
            },
            {
                path:"answers",
                select:"content"
            }
        ]  
}), getSingleQuestion)
router.put("/:id/edit", [getAccesToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion)
router.delete("/:id/delete", [getAccesToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion)
router.get("/:id/like", [getAccesToRoute, checkQuestionExist], likeQuestion)
router.get("/:id/undolike", [getAccesToRoute, checkQuestionExist], undolikeQuestion)
router.use("/:question_id/answers", checkQuestionExist, answer)

module.exports = router;