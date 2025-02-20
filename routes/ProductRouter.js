const router=require('express').Router();
const { verifyTokenAndadmin, VerifyTokenandauthorization  }=require('../middlewares/VerifyToken');
const {postProducts}=require('../controller/productsController')
const Product=require('../modeles/productModeles')
//Upload products



//Post product
router.post('/post-product',postProducts)




module.exports=router