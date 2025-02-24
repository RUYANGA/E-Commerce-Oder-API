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
const cookieSession =require('cookie-session')

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

app.set('trust proxy',true)

//Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieSession({
    signed:false,
    secure:false
}))

//Routers

app.get('/',async(req,res)=>{
   
    res.send(`<h1 style='color:blue'>Welcome to our E-commerce API </h1>`)
}
)
app.use('/api/user/',UserAuth);
app.use('/api/user',Users)
app.use('/api/user',forgetPassword);
app.use('/api/product',postProduct);
app.use('/api/card',card)
