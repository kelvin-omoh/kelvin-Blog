import mongoose, { Mongoose, Schema } from "mongoose";
import { User } from "./User.js";

const postSchema= mongoose.Schema({
    title:{
        type:String,
        min:2,
        required:true
    },
    description:{
        type:String,
        min:2,
        required:true

    },
    category:{
        type:[String],
        required:true

    },
    coverImage:{
        type:String, 
    },
    author:{
        type:String,
        ref:'User',
        required:true
    },
    authorId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
  
}, {
    timestamps: true,
  }

)

export const Post= mongoose.model("Post",postSchema)