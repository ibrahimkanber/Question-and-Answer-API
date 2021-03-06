const User = require("../models/User")

const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers.js");
const { validateUserInput ,comparePassword} = require("../helpers/input/inputHelpers");
const {sendEmail}=require("../helpers/libraries/sendEmail")



const register = asyncErrorWrapper(async (req, res, next) => {


    const {name,email,password,role}=req.body;
    const user = await User.create({
        name,
        email,
        password,role
    });
    sendJwtToClient(user,res)
    
})


const login=asyncErrorWrapper(
  
        async(req,res,next)=>{
            const {email,password}=req.body;

            if (!validateUserInput(email,password)){
                return next(new CustomError("Please check your input",400))
            }

            const user=await User.findOne({email}).select("+password")
            
            if(!comparePassword(password,user.password)){
                return next(new CustomError("please check your credentials",400))
            }

            sendJwtToClient(user,res)

        },

)


const logout=asyncErrorWrapper(async(req,res,next)=>{
    const {NODE_ENV}=process.env

    return res.status(200)
    .cookie({
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:NODE_ENV==="development" ? false :true
    })
    .json({
        success: true,
        message:"logout succesful"
    })
})


const getUser=(req,res,next)=>{
res.json({
    success:true,
    data:{
        id:req.user.id,
        name:req.user.name
    }
})
}

const imageUpload=asyncErrorWrapper(async(req,res,next)=>{

   const user= await User.findByIdAndUpdate(req.user.id,
       { "profile_image":req.savedProfileImage}, {
           new:true,
           runValidators:true

       }  )
    res.status(200)
    .json({
        success: true,
        message:"image upload successfull",
        data:user
    })
})



const forgotPassword=asyncErrorWrapper(
        async(req,res,next)=>{
            const resetEmail=req.body.email
            const user=await User.findOne({email:resetEmail})

            if(!user){
                return next(new CustomError("there is no user with that e-mail",400))
            }

            const resetPasswordToken= user.getPasswordTokenFromUser()
            
            await user.save()

            const resetPasswordURL=`http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`

            const emailtemplate=`
            <h3>Reset Your Password</h3>
            <p>This <a href='${resetPasswordURL}' target='_blank'>link</a> will expire in 1 hour</p>
            `
            try {
                await sendEmail({
                    from:process.env.USER_MAIL,
                    to:"ikanber45@gmail.com",
                    subject :"Reset Your password",
                    html:emailtemplate
                })
                return res.status(200).json({
                    success:true,
                    message:"Tooken sent to your email adress"
                })
            } catch (error) {
                user.resetPasswordToken=undefined
                user.resetPasswordExpire=undefined
                await user.save();
                return next(new CustomError("Email couldnt be sent",500))
            }
            
         
        }


)

const resetPassword=asyncErrorWrapper(async(req,res,next)=>{

        const {resetPasswordToken} = req.query;
        const {password}=req.body
    
        if(!resetPasswordToken){
            next(new CustomError("Please provide a valid token",400))
        }

        let user=await User.findOne({
            resetPasswordToken:resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        })

        if(!user){
            return next(new CustomError("Invalid Token or Session Expired",404))
        }

        user.password=password
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save()

        return res.status(200).json({
            message:"reset password successful",
            token:req.query,
            password:req.body
        })
}

)

const editDetails=asyncErrorWrapper( async(req,res,next)=>{
        const editInfo=req.body;

        const user=await User.findByIdAndUpdate(req.user.id,editInfo,{
            new:true,
            runValidators:true
        })


        return res.status(200)
        .json({
            success:true,
            messsage:"user info updated",
            data:user
        })
})





const errorTest = (req, res, next) => {
    return next(new SyntaxError("Syntax Error"))
}


module.exports = {
    register,
    errorTest,
    getUser,
    login,
    logout,
    imageUpload,
    forgotPassword,
    resetPassword,
    editDetails
}
