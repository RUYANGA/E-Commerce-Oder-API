const mongoose =require('mongoose');

const CartSchem= new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    product:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number
            }
        }
    ],
   
    
    
},{timestamps:true});

module.exports=mongoose.model('Card',CartSchem);