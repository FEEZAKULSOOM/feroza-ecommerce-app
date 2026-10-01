
import jwt from "jsonwebtoken"
const isAuth = (req, res, next) => {
    try {
        let {token} = req.cookies
        if(!token) {
            return res.status(401).json({message: "User does not have a valid token"})
        }
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
          if(!verifiedToken) {
            return res.status(401).json({message: "User does not have a valid token"})
          }
          req.userId = verifiedToken.id
          next()

    } catch (error) {
        console.error("Error in isAuth middleware:", error);
        return res.status(401).json({message: "User does not have a valid token"})
    }
}

export default isAuth