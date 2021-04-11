const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const Schema = mongoose.Schema;
const Question=require("./Question")
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const UserSchema = new Schema({

    name:{
        type:String,
        required: [true,"Please provide a name"]
    },

    email:{
        type:String,
        required:[true,"Please enter an e-mail"],
        unique:true,
        match:[
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provie a valid e mail"
        ]
    },

    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength:[6 ,"please provide password with min length 6"],
        required:[true,"please provie a password"],
        select:false,

    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    title:{
        type:String,

    },
    place:{
        type:String,

    },
    website:{
        type:String,

    },
    profile_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type: String
    },
    resetPasswordExpire:{
        type:String
    }


})

////UserSchema

UserSchema.methods.getPasswordTokenFromUser=function(){
    const randomHexString=crypto.randomBytes(15).toString("hex")
    /* console.log(randomHexString) */
    const {RESET_PASSWORD_EXPRIRE}=process.env
    const resetPasswordToken=crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");
    this.resetPasswordToken=resetPasswordToken
    this.resetPasswordExpire=Date.now()+parseInt(RESET_PASSWORD_EXPRIRE)  

    return(resetPasswordToken)
}


UserSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env
    const paload={
        id:this._id,
        name:this.name,
    }

    const token=jwt.sign(paload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    })

    return token
}


////pre hooks
UserSchema.pre("save",function (next){

    if(!this.isModified("password")){
        next()
    }
    
    bcrypt.genSalt(10, (err, salt)=> {
        if(err) next(err)
        bcrypt.hash(this.password, salt, (err, hash)=> {
            if(err) next(err)
            this.password=hash
            next()
            // Store hash in your password DB.
        });
    });
})

UserSchema.post("remove", async function(){

    await Question.deleteMany({
        user:this._id
    })
})
 


module.exports = mongoose.model("User",UserSchema);
//users