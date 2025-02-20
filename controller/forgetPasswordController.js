const User =require('../modeles/userModele');
const nodemailer =require('nodemailer');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const Forget_Password=async(req,res)=>{

    //try to send link reset password
     try {
           //varable decralation
           const {email}=req.body
   
           //email required
           if(!email) return res.json({Message:"Email required"});
   
           //find if email existing in DB
           const existEmail=await User.findOne({email});
   
           //when email not existing in BD
           if(!existEmail) return res.json({Message:"User not found in DB"});
   
           //create token to reset password
           const token= jwt.sign(
               {
                 email:existEmail._id,
                 isAdmin:existEmail.isAdmin,
                 user:existEmail.email                     
               },
               process.env.SECURITY_KEY,
               {
                   expiresIn:process.env.EXPIRED_TIME
               }
           )
   
           //save token
           User.token=token;
       
           //create transporter details 
           const transporter=nodemailer.createTransport({
               service:'gmail',
               secure:true,
               auth:{
                   user:process.env.EMAIL,
                   pass:process.env.EMAIL_PASSWORD
               }
   
           })
   
           //create receiver details
           const reciever={
               from:process.env.EMAIL,
               to:email,
               subject:"RUYANGA LTD Reset Password Request",
               text:`Click on this link to reset password this link expired in ${process.env.EXPIRED_TIME}\n\n ${process.env.CLIENT_URL}/reset-password/${token}`
           }
   
           //send reset link to  email
           await  transporter.sendMail(reciever);
   
           //reset link sent successefully
           res.json({Message:`password reset link send to ${email} successefully`});
   
       } catch (error) {
   
           //error to send link
           console.log("Internal server error",error);
           res.json(error.message);
       }
   
   }

   const Reset_Password=async(req,res)=>{

    //try to reset password if no error
    try {

        //variable decralatin
        const token=req.params.token;
        const { password1 }=req.body;

        //check if token exist
        if(!token) return res.json({Message:"Token required"});
        
        //check if password exist
        if(!password1) return res.json({Message:"Password required"});

        //verify if token valid and correct
        const verfyToken= jwt.verify(token,process.env.SECURITY_KEY,(error,user)=>{
            if(error) return res.json('Token expired');
        })

        //find email with token provided
        const resetUser= await User.findOne({email:verfyToken.email});

        //check if token existing in any email stored in DB
        if(!resetUser) return res.json("user for reset password not found");

        //hash new password before store it in DB
        const hashPassword= await bcrypt.hash(password1,12);

        //asign new password to the user
        resetUser.password1=hashPassword;

        //password saved in DB
        await resetUser.save();

        //reset password successefully
        res.json({Message:"Password reset successefully"});

        //other internal sever error
    } catch (error) {

        //error to reset password
        console.log("Internal server error",error.message);

        //message of error
        return res.json(error.message)
        
    }
}


module.exports={Forget_Password,Reset_Password}