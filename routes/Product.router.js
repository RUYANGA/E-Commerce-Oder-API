const router=require('express').Router();
const multer=require('multer');
const { verifyTokenAndadmin, VerifyTokenandauthorization  }=require('../middlewares/VerifyToken');
const {postProducts}=require('../controller/products.controller')
const cloudinary=require('../utile/cloudinary')
const Product=require('../modeles/product.modeles')
//Upload products
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage }).single('file')



//Post product
router.post('/post-product/:id',verifyTokenAndadmin,upload,postProducts)




module.exports=router