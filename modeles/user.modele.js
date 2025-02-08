const mongoose =require('mongoose');

const UserSchem= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password1:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:false
    },
    token:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model('User',UserSchem);