const router=require('express').Router();
const { UpdateUser, DeleteUser, GetallUser, StatUser } = require('../controller/users.controller');
const { VerifyToken ,VerifyTokenandauthorization, verifyTokenAndadmin} = require('../middlewares/VerifyToken');

//Update user
router.patch('/:id',VerifyTokenandauthorization,UpdateUser );

//User delete
router.delete('/:id',VerifyTokenandauthorization,DeleteUser);

//Get all user and filter
router.get('/users',verifyTokenAndadmin,GetallUser);

router.get('/status',verifyTokenAndadmin,StatUser);


module.exports=router;