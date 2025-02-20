const mongoose =require('mongoose');

const OderSchem= new mongoose.Schema({
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
            }
        }
    ],
   amount:{
    type:Number,
    required:true
   },
   adress:{
    type:Object,
    required:true
   },
   startus:{
    type:String,
    default:'Pending'
   }
    
    
},{timestamps:true});

module.exports=mongoose.model('Oder',OderSchem);