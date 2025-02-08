const router=require('express').Router();
const { Forget_Password, Reset_Password } = require('../controller/forget-password.controller');
const { VerifyTokenandauthorization } = require('../middlewares/VerifyToken');

//forget passwod router
router.post('/forget-password',Forget_Password)

//reset password router
router.post('/reset-password/:token', VerifyTokenandauthorization, Reset_Password)

//export router
module.exports=router