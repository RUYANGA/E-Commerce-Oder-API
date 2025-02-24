const User =require('../modeles/userModele');
const bcrypt =require('bcrypt');
const router=require('express').Router();
const jwt=require('jsonwebtoken');

const Register= async(req,res)=>{
    //try register if no error
    try {
        //variable decralation
        const {username,email,password1,password2}=req.body;
 
         //check if all input entered
        if(!(username && email && password1 && password2)){
             return res.status(404).json({Message:"All Field required"});
        }

        //check if password is match
        if(password1 !== password2){
            return res.json({Message:'Password not match'});
        };
        //find if user already register in DB
        const existEmail =await User.findOne({email});
        if(existEmail) return res.status(200).json({Message:"User existing in DB"});
         
        //encrypt/hash password
        const pass1= await bcrypt.hash(password1,12);

         //Save new user in DB
        const SaveUser=await User.create({
            username,
            email,
            password1:pass1,
                      
        });
         const Token= jwt.sign(
                 {
                     id:existEmail._id,
                     email:existEmail.email,
                     isAdmin:existEmail.isAdmin
                     
                 },
                 process.env.JWT_SEC,
                 {
                     expiresIn:"1day"
                 }
             );
             
        req.session={
                jwt:Token
             }

        //user is registed successefully
        res.json({message:"User register successefully"});

        //Internal sever error
    } catch (error) {
        console.log('Internal saver error',error);
        res.status(500).json('Internal saver error',error.message);
    }
}

const Login=async(req,res)=>{
    try {
         //variable decralation
         const {email,password1}=req.body;
 
         //check if all input entered
         if(!(email && password1)) return res.status(404).json({Message:"All field required"});
         
         //find if user already register in DB before login
         const existEmail=await User.findOne({email});
     
         //check if user existing in DB
         if(!existEmail) return res.status(404).json({Message:"Email or password incorect"});
     
         //compare password and email in DB
         if((password1 && (await bcrypt.compare(password1,existEmail.password1)))){
             const{password1,password2,...other}=existEmail._doc
             
             const Token= jwt.sign(
                 {
                     id:existEmail._id,
                     email:existEmail.email,
                     isAdmin:existEmail.isAdmin
                     
                 },
                 process.env.JWT_SEC,
                 {
                     expiresIn:"1day"
                 }
             );
             
             req.session={
                jwt:Token
             }
 
             //user login successefully
             return res.status(200).json({...other,Token});
         }
      // email or password incorect
      return res.status(404).json({Message:"Email or password incorect"});
    } catch (error) {
     //any errors
     
     res.status(500).json({Message:'Internal saver error'});
    }
 }

module.exports={Register,Login};