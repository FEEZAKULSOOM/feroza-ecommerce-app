import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}


export const getAdmin = async (req, res) =>  {
     try {
        let adminEmail= req.adminEmail
         if(!adminEmail) {
             return res.status(404).json({ message: "Admin not found" });
         }

         return res.status(200).json({ message: "Admin found",
             email:adminEmail
             ,
             role:"admin"
          });

     }
     catch (error) 
     {
         console.error("Error in getAdmin:", error);
         return res.status(500).json({ message: "Internal server error", error: error.message });
     }
}