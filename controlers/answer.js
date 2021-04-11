const Question=require("../models/Question")
const Answer=require("../models/Answer")
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const { json } = require("express");


const addAnswerToQuestion= asyncErrorWrapper( async (req,res,next)=>{
    const {question_id}=req.params;

    const userId=req.user.id;
   
    const answerInfo=req.body;

    const answer= await Answer.create({
            ...answerInfo,
            question:question_id,
            user:userId
    })

    return res.status(200)
    .json({
        success: true,
        data:answer
    })


})
const getAllAnswersByQuestion= asyncErrorWrapper( async (req,res,next)=>{
    const {question_id}=req.params;

    const question=await Question.findById(question_id).populate("answers")

    const answers=question.answers

    
    return res.status(200)
    .json({
        success: true,
        data:answers,
        count:answers.length
    })


})
const getSingleAnswer= asyncErrorWrapper( async (req,res,next)=>{
    
    return res.status(200)
    .json({
        success:true,
        data:req.answerInfo
    })

})
const editAnswer= asyncErrorWrapper( async (req,res,next)=>{
    
    const answerInfo=req.body;
    const {answer_id}=req.params;

    const answer=await Answer.findByIdAndUpdate(answer_id,answerInfo,{
        new:true,
        runValidators:true
    })

    return res.status(200)
    .json({
        success:true,
        data:answer
    })

})
const deleteAnswer= asyncErrorWrapper( async (req,res,next)=>{

    const {answer_id}=req.params;

    const {question_id}=req.params;

    await Answer.findByIdAndRemove(answer_id)

    const question=await Question.findById(question_id)

    const answersArray=question.answers
    const index=answersArray.indexOf(answer_id)
    answersArray.splice(index,1)
    question.answerCount=question.answers.length

    await question.save()
    
    return res.json({
        success:true,
        message:"Answer deleted"
    })

})
const likeAnswer=asyncErrorWrapper(
    async(req,res,next)=>{
        const {answer_id}=req.params
        const answer=await Answer.findById(answer_id)
        
        if (answer.likes.includes(req.user.id)){
             return next (new CustomError("You already liked this answer",400))
        }

        answer.likes.push(req.user.id)

        await answer.save()

        res.status(200)
        .json({
            success:true,
            data:answer
        })
    }
)
const undolikeQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
        const {answer_id}=req.params
        const answer=await Answer.findById(answer_id)
        
        if (!answer.likes.includes(req.user.id)){
            next (new CustomError("you haven't liked this answer already",400))
        }

        const index=answer.likes.indexOf(req.user.id)
        answer.likes.splice(index,1)

        await answer.save()

        res.status(200)
        .json({
            success:true,
            data:answer
        })
    }
)




module.exports={addAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswer,deleteAnswer,likeAnswer,undolikeQuestion}