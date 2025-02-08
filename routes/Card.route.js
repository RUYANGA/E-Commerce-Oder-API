const router =require('express').Router();


router.post('/card',async(req,res,next)=>{

    res.status(200).json("card")
})

 




module.exports=router