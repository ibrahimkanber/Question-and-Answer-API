const sendJwtToClient=(user,response)=>{


    const token=user.generateJwtFromUser();
    const {JWT_COOKIE,NODE_ENV}=process.env;
    // console.log(JWT_COOKIE)
    return response
    .status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        exprires:new Date(Date.now()+parseInt(JWT_COOKIE)*1000*60),
        secure:false
    })
    .json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            email: user.email
        }
    })

}


const isTokenIncluded=(req)=>{
    // console.log(req.headers)
return(
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
)
}

const getAccessTokenFromHeader=(req)=>{
    const authorization=req.headers.authorization;
    const access_token=authorization.split(" ")[1]
    // console.log(access_token)
    return access_token

}

module.exports= {sendJwtToClient,isTokenIncluded,getAccessTokenFromHeader};
