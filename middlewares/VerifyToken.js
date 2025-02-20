const jwt=require('jsonwebtoken')

//Verify token
const VerifyToken=async(req,res,next)=>{
    const authHeader=req.headers.token;

    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(error,User)=>{
            if(error) return res.status(403).json({Message:'Token is not valid or Expired'});
            req.user=User;
            next()
        })
    }else{
        return res.status(401).json({Message:"You are not Authenticated"});
    }
}

//Verify users
const VerifyTokenandauthorization=async(req,res,next)=>{
    VerifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(403).json({Message:'You are not alowed to do that!'})
        }
    })
}
//verify admin
const verifyTokenAndadmin=async(req,res,next)=>{
    VerifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.json({message:'You are not Admin'});
        }
    })

}

module.exports={VerifyToken,VerifyTokenandauthorization,verifyTokenAndadmin}