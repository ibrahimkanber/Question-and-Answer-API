const mongoose = require("mongoose");
const Question=require("./Question")
const Schema = mongoose.Schema;

const answerSchema = new Schema({

    content: {
        type: String,
        required: [true, "please provide a content"],

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: [
        {
            type:mongoose.Schema.ObjectId,
            ref:"User"

    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    question:{
        type:mongoose.Schema.ObjectId,
        ref:"Question",
        required:true
    }
    

})

answerSchema.pre("save",async function(next){


    if(!this.isModified("user")) return next()

    try {
        const question= await Question.findById(this.question) 
        question.answers.push(this._id)
        question.answerCount=question.answers.length;
        await question.save()
        next()
        
    } catch (error) {
        return next(error)
    }

     
})

module.exports=mongoose.model("Answer",answerSchema)