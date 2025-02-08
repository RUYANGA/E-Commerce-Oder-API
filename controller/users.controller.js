const { Status } = require('whatsapp-web.js');
const { verifyTokenAndadmin } = require('../middlewares/VerifyToken');
const User=require('../modeles/user.modele');
const bcrypt =require('bcrypt');
const { get } = require('mongoose');



const UpdateUser= async (req, res) => {
    try {
        const id = req.params.id;
        const { email, username, password1, password2 } = req.body;
    
        if (password1 !== password2) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
    
        const hashpassword = await bcrypt.hash(password1, 12);
    
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { email, username, password1: hashpassword },
            { new: true }
        );
    
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
    
        return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };

const DeleteUser= async(req,res)=>{
    
    const id=req.params.id;
    try {
        
        if(id){

            const deletUser =await User.findByIdAndDelete(id);
            if(deletUser) return res.status(200).json("User deleted successfuly");
            return res.json({Message:"user not found"});
        }else{
            return res.json({Message:"User id required"});
        }
    } catch (error) {
        console.log(error);
    }
}

const GetallUser= async(req,res)=>{
    const user=req.body;
    const getUsers= await User.find({},{username:1,isAdmin:1,email:1,createdAt:1});
  
    if(!getUsers) return res.status(404).json({message:"User not found"});
    res.json({UserRegistered:getUsers});
}


const StatUser=async(req,res)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear() - 1));

    try {

        const data= await User.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:lastYear
                    }
                }
            },
            {
                $project:{
                    month:{
                        $month:"$createdAt"
                    },
                },
            },
            {
               $group:{
                _id:"$month",
                totalUser:{
                    $sum:1
                }
               }
            }
        ])
    
        res.json({monthlyRegistered:data})
    } catch (error) {

        res.status(500).json({message:"error to get user status"});
        console.log("error to get user status",error)
        
    }
}


module.exports={UpdateUser,DeleteUser,GetallUser,StatUser};