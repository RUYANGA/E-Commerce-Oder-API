const cloudinary=require('cloudinary').v2

cloudinary.config({
    cloud_name:process.env.CLUDINARY_NAME,
    api_key:process.env.CLUDINARY_IPA_KEY,
    api_secret:process.env.CLUDINARY_IPA_SECRET

})


module.exports=cloudinary