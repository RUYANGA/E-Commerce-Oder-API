require('dotenv').config();
const express=require('express');
const app=express();
var user=require('./modeles/userModele.js')
const UserAuth=require('./routes/AuthRoutes.js');
const Users=require('./routes/UserRouter')
const forgetPassword=require('./routes/ForgetPasswordRouter');
const postProduct=require('./routes/ProductRouter');
const card =require('./routes/CardRoute')
const bodyParser = require('body-parser');


const port=process.env.PORT||4000;
const cors=require('cors')
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('DB connected successfully');
    app.listen(port,()=>{
        console.log(`Server is running on port http://localhost:${port}`);
    });    
   
})
.catch((e)=>{
    console.log('Error to connect DB',e.message);
})



//Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routers

app.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const t=await user.findById(id)
    res.send(`<h1 style='color:blue'>Admin is : ${t.username}  </h1>`)
}
)
app.use('/api/user/',UserAuth);
app.use('/api/user',Users)
app.use('/api/user',forgetPassword);
app.use('/api/product',postProduct);
app.use('/api/card',card)
