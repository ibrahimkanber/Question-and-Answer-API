
const bcyrpt=require("bcryptjs")

const validateUserInput=(email,password)=>{
    return email && password
}


const comparePassword=(password,hashedPasword)=>{
    return bcyrpt.compareSync(password,hashedPasword)
}

module.exports={validateUserInput,comparePassword};