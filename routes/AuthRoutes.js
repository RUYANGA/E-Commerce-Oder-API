const router=require('express').Router()
const VerifyToken=require('../middlewares/VerifyToken')
const { Register, Login, homePage } = require('../controller/auth.controllers')

// User registration router
router.post('/register',Register)

//User login router
router.post('/login',Login);

//export router
module.exports=router