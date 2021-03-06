const CustomError = require("../../helpers/error/CustomError");
const jwt=require("jsonwebtoken");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/authorization/tokenHelpers");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");
const Question=require("../../models/Question");
const Answer=require("../../models/Answer")

const getAccesToRoute=(req,res,next)=>{
    //token Control

    const {JWT_SECRET_KEY}=process.env


    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized this route1111",401))
    }

    const accessToken=getAccessTokenFromHeader(req)


    // console.log(accessToken)
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded)=>{
        
        if(err){
            return next (new CustomError("You are not authorized to access deneme",401))
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }
        /* console.log(decoded) */
        next()
    })
   
    
}

const getAdminAccess=asyncErrorWrapper(async(req,res,next)=>{

    const {id} = req.user

   const user = await User.findById(id)

   if(user.role !== "admin" ){
       next(new CustomError("This route is accesible only for admin",403))
   }

   next()
        
    
})
const getQuestionOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{

    const userId= req.user.id
    const questionId=req.params.id

   const question = await Question.findById(questionId)
/*     console.log(question.user)
    console.log(userId) */
  if(question.user !=userId){
       return next(new CustomError("Only questionowner can handle this operation",403))
   } 

   next()

            
})

const getAnswerOwnerAccess=asyncErrorWrapper(async(req,res,next)=>{

    const userId= req.user.id
    const {answer_id}=req.params

   const answer = await Answer.findById(answer_id)
/*     console.log(question.user)
    console.log(userId) */
  if(answer.user !=userId){
       return next(new CustomError("Only answerowner can handle this operation",403))
   } 


   next()

            
})





module.exports={getAccesToRoute,getAdminAccess,getQuestionOwnerAccess,getAnswerOwnerAccess}