import { Post } from "../models/Post.js"
import { User } from "../models/User.js"

export const addAPost= async(req,res)=>{
  
    try {
         const post=await new Post(req.body)
        const response= await post.save()
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }
 

}




export const getAPost= async(req,res)=>{
    const {id} = req.params;
    try {
         const post=await  Post.findById(id)
        //  console.log(req.params);
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
    }
 

}



/*
import jwt from 'jsonwebtoken';
import { secretKey } from './config'; // Replace with your actual secret key

export const deleteAPost = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization; // Assuming the token is passed in the "Authorization" header

    try {
        // Verify the user's token to ensure they are authorized
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Unauthorized" });
            } else {
                // Check if the user is authorized to delete the post
                const userId = decoded.userId; // Assuming the token contains the user's ID
                const post = await Post.findById(id);

                if (post) {
                    if (post.author === userId) {
                        await Post.findByIdAndDelete(id);
                        res.status(200).json(post);
                    } else {
                        res.status(403).json({ error: "Forbidden: You are not authorized to delete this post" });
                    }
                } else {
                    res.status(404).json({ error: "Post not found" });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




*/

    export const deleteAPost = async (req, res) => {
        const { id } = req.params;
        const token = req.headers.authorization
        try {

            jwt.verify(token, process.env.SECRETE, async (err, decoded) => {
                if (err) {
                    res.status(401).json({ error: "Unauthorized" });
                } else {
                    const post = await Post.findById(id);
                    const userId = decoded.userId; // Assuming the token contains the user's ID
       
                    if (post) {
                        if (post.author === userId) {
                            await Post.findByIdAndDelete(id);
                            res.status(200).json(post);
                        } else {
                            res.status(403).json({ error: "Forbidden: You are not authorized to delete this post" });
                        }
                    } else {
                        res.status(404).json({ error: "Post not found" });
                    }

        }})
           
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

export const getAllPost= async(req,res)=>{
    
    try {
         const post=await  Post.find({})
    
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
    }
 

}

export const updateAPost= async(req,res)=>{
    
    try {

        const { id } = req.params;
        const {title,description,category,coverImage}=req.body
        const data =await Post.findByIdAndUpdate(id,{title,description,category,coverImage})
        if(!data){
            throw new Error ("An Error occured while Updating  a note")
        }else{

            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json({error:"An error occured while updating this data"})
        
    }
 

}



export const getMypost= async(req,res)=>{
    
    try {

        const userId=req.params.id

        
        const data =await User.findById(userId)
        if(!data){
            throw new Error ("An Error occured while Updating  a note")
        }else{
            res.status(200).json(data)
        }

    } catch (error) {
        res.status(500).json({error:"An error occured while updating this data"})
        
    }
 

}


// Your route to get all posts for a specific admin
export const getMyPosts = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // First, find the user based on their ID
      const user = await User.findById(userId);
  
      if (!user) {
        // If the user doesn't exist, return an error response
        return res.status(404).json({ error: "User not found" });
      }
  
      
      const userPosts = await Post.find({ author: userId });
  
      
      res.status(200).json(userPosts);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while retrieving user's posts" });
    }
  };


//   export const deleteAPost = async (req, res) => {
//     try {
     
//         const { id } = req.params;
  
//       // Use Mongoose's findByIdAndDelete method to delete the user
//       const deletedUser = await Post.findByIdAndDelete(id);
  
//       if (deletedUser) {
//         // If the user was found and deleted successfully, respond with a success message
//         res.status(200).json('User deleted successfully');
//       } else {
//         // If the user with the given ID was not found, respond with an error message
//         res.status(404).json({ error: 'User not found' });
//       }
//     } catch (error) {
//       // If any other error occurs, respond with a server error
//       res.status(500).json({ error: "An error occurred while deleting the user" });
//     }
//   };