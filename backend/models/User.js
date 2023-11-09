import mongoose, { Mongoose } from "mongoose";

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        unique:true,
        resquired:true,
    },
    password:{
        type:String,
        resquired:true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, // Reference Post documents using ObjectId
        ref: 'Post', // Reference the 'Post' model
    }]
})

export const User=mongoose.model("User",UserSchema)