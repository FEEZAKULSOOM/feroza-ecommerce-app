import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env file");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};



export const generateToken1 = (email) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env file");
    }
    const token = jwt.sign({email}, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};