const nodemailer=require("nodemailer")

const sendEmail=async(mailOptions)=>{
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth: {
            user:process.env.USER_MAIL,
            pass:process.env.PASSWORD
        },
    });

    let info=await transporter.sendMail(mailOptions)
}

module.exports ={ sendEmail}