const router=require('express').Router();
const { verifyTokenAndadmin, VerifyTokenandauthorization  }=require('../middlewares/VerifyToken');
const {postProducts}=require('../controller/products.controller')
const Product=require('../modeles/product.modeles')
//Upload products



//Post product
router.post('/post-product',postProducts)




module.exports=router