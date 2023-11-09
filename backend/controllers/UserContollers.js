
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { json } from "stream/consumers"
import { User } from '../models/User.js'
const RegisterUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ username, password: hashPassword });

    return res.status(200).json(newUser);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in RegisterUser:", error);
    return res.status(500).json({ error: "An error occurred while registering the user." });
  }
};


const LoginUser=async(req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ username: userName });

    if (!user) {
      return res.status(400).json("User doesn't exist!!!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const token = jwt.sign({ id: user._id }, process.env.SECRETE, {
        expiresIn: '2h',
      });

      res.status(200).json({ token, userName, userId: user._id });
    } else {
      res.status(401).json("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
}



export {
    RegisterUser,
    LoginUser,
}