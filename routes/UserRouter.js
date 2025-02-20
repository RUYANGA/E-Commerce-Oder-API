const router=require('express').Router();
const { UpdateUser, DeleteUser, GetallUser, StatUser } = require('../controller/usersController');
const { VerifyToken ,VerifyTokenandauthorization, verifyTokenAndadmin} = require('../middlewares/VerifyToken');

//Update user
router.patch('/:id',VerifyTokenandauthorization,UpdateUser );

//User delete
router.delete('/:id',VerifyTokenandauthorization,DeleteUser);

//Get all user
router.get('/users',verifyTokenAndadmin,GetallUser);

//User status
router.get('/status',verifyTokenAndadmin,StatUser);


module.exports=router;