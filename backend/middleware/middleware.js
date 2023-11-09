import jwt from "jsonwebtoken";
// verifyToken
// export const verifyToken = (req, res, next) => {
//     if(!req.headers.authorization) return res.status(403).json({msg: "Not authorized. No token"})

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
//         const token = req.headers.authorization.split(' ')[1]
//         jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//             if(err) return res.status(403).json({msg: "Wrong or expired token."})
//             else {
//                 req.user = data
//                 next()
//             }
//         })
//     }
// }



// // Middleware function to verify the token
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json("Token is missing");
    }
  
    jwt.verify(token, process.env.SECRETE, (err, decoded) => {
      if (err) {
        return res.status(401).json("Invalid token");
      }
      
      req.user = decoded; // Store the decoded user information in the request object
      next(); // Continue to the next middleware or route
    });
  };
  