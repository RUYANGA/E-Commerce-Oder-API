const mongoose =require('mongoose');

const ProductSchem= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true 
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
    
},{timestamps:true});

module.exports=mongoose.model('Product',ProductSchem);