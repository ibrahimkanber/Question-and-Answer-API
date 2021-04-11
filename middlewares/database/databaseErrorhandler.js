const User=require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");
const Question = require("../../models/Question");
const Answer=require("../../models/Answer")


const chectUserExist=asyncErrorWrapper(async(req,res,next)=>{
    const {id}=req.params;
   /*  console.log(id) */
    const user= await User.findById(id);

    if(!user){
      next(new CustomError("there is no such user with that id",400))
    }

    req.userInfo=user
    next()
})
const checkQuestionExist=asyncErrorWrapper(async(req,res,next)=>{
    const questionId=req.params.id || req.params.question_id;
  /*   console.log(id) */
    const question= await Question.findById(questionId);

    if(!question){
      next(new CustomError("there is no such question with that id",400))
    }

    req.questionInfo=question
    next()
})

const checkQuestionAndAnswerExist=asyncErrorWrapper(async(req,res,next)=>{
    const questionId=req.params.question_id;
    const answer_id=req.params.answer_id;

  /* console.log(req.params) */
    const answer= await Answer.findOne({
      _id:answer_id,
      question:questionId
    }).populate(
        {
            path:"question",
            select:"title"
        }
      ).populate(
        {
          path:"user",
          select:"name profile_image"
        }
      )

   
    if(!answer){
      return next(new CustomError("there is no such answer with that id associated with question id",400))
    }
    req.answerInfo=answer
    next()
})

module.exports = {chectUserExist,checkQuestionExist,checkQuestionAndAnswerExist}