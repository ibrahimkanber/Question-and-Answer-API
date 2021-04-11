const Question = require("../models/Question");

const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");

const askNewQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const information=req.body;

    const question=await Question.create({
        ...information,
        user:req.user.id
    });

    res.status(200)
    .json({
        success:true,
        data:question
    })
})

const getAllQuestions=asyncErrorWrapper(
    async(req,res,next)=>{
       return  res.status(200)
        .json(res.queryResults)
    }
)
const getSingleQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
     return res.status(200).json(res.queryResults)
    }
)

const editQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
        const {id}=req.params
        const {title,content}=req.body
        const question=await Question.findByIdAndUpdate(id,{title,content},{
            new:true,
            runValidators:true
        })

        res.status(200)
        .json({
            success:true,
            data:question
        })
    }


)
const deleteQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
        const {id}=req.params
        await Question.findByIdAndDelete(id)
        
        res.status(200)
        .json({
            success:true
        })
    }
)
const likeQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
        const {id}=req.params
        const question=await Question.findById(id)
        
        if (question.likes.includes(req.user.id)){
             return next (new CustomError("You already liked this question",400))
        }

        question.likes.push(req.user.id)
        question.likeCount=question.likes.length

        await question.save()

        res.status(200)
        .json({
            success:true,
            data:question
        })
    }
)
const undolikeQuestion=asyncErrorWrapper(
    async(req,res,next)=>{
        const {id}=req.params
        const question=await Question.findById(id)
        
        if (!question.likes.includes(req.user.id)){
            next (new CustomError("you haven't liked this question already",400))
        }

        const index=question.likes.indexOf(req.user.id)
        question.likes.splice(index,1)
        question.likeCount=question.likes.length

        await question.save()

        res.status(200)
        .json({
            success:true,
            data:question
        })
    }
)

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undolikeQuestion
}