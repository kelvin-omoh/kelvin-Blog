import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js'
import postRouter from './router/postRouter.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/auth",userRouter)
app.use("/post",postRouter)




  const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb Connected ");
    } catch (error) {
      console.log(error);
    }
  
    
    }
    connectDb()
 



app.listen(3001,()=>{
    console.log("Server listening on 3001");
})