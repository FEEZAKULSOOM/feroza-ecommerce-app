import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { generateToken , generateToken1 } from "../config/token.js";
export const registration = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      if (!validator.isEmail(email)) {
         return res.status(400).json({ message: "Invalid email format" });
      }
      if (!validator.isLength(password, { min: 6 })) {
         return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }
       let hashedPassword = await bcrypt.hash(password, 12);

       const user = await User.create({
            name,
            email,
            password: hashedPassword
       })
       let token = await generateToken(user)
       res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 *6
   
     
   
   })
       return res.status(201).json({ message: "User registered successfully", user })
   } catch (error) {
    console.error("Error in registerUser:", error);
       return res.status(500).json({ message: "Internal server error" , error: error.message })
   }
}

export const login = async (req, res) =>  {
    try {
      let { email, password } = req.body;

      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      let token = await generateToken(user)
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 *6
   
     
   
   })
      return res.status(200).json({ message: "User logged in successfully", user })
}
   catch (error ) {

   }
}

export const logout = async (req, res) =>  {
try{
       res.clearCookie("token");
   return res.status(200).json({ message: "User logged out successfully" });
}
catch(error){
    console.error("Error in logoutUser:", error);
    return res.status(500).json({ message: "Internal server error" , error: error.message })
}
}

// userController.js
export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      // Provide a placeholder password or make password optional in userModel.js
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);

      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    let token = await generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Set to true in production with HTTPS
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 6,
    });

    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error in googleLogin:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export  const adminLogin = async (req , res) => {
    try {
    let { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });

    }
      if ( email === process.env.ADMIN_EMAIL && 
        password === process.env.ADMIN_PASSWORD) {
          let token = await generateToken1(email);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Set to true in production with HTTPS
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 1,
          });
          return res.status(200).json({ message: "Admin logged in successfully"
            ,token
          });
           
        
        
      }
  }
    catch(error){
        console.error("Error in adminLogin:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
    
}