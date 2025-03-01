// cors use to allow frontend ip to access to backend
// dotenv use to use environment variable 
// express use to create apis
// webtoken used so that we can enable user authentication
// mongoose manage database
// multer use to allow us to store image in our cloudinary storage
// nodemon use to run restart in backend whenever we make a change
// razorpay and stripe use to setup online payemtn method
// user data is valid por not check
// bcrypt use to encrypt user data and store in our database
// In models we define our schema


// -----------------------MIDDLEWARE----------------------------
// Middleware in backend development serves as an intermediate layer
//  between a request and a response. It is used to process requests before
//  they reach the final route handler and responses before they are sent 
// back to the client. Middleware functions can handle various tasks such 
// as authentication, logging, request parsing, error handling, and modifying
//  request/response objects.

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';


import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config

const app=express()
const port=process.env.PORT||3000
dotenv.config();
connectDB();
connectCloudinary();
// middleware
app.use(express.json());
app.use(cors())

// Api ends points
app.use('/api/user',userRouter);
app.use('/api/product',productRouter);

app.use('/api/cart',cartRouter);

app.use('/api/order',orderRouter);


app.get('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>console.log('Server started on port:'+port));