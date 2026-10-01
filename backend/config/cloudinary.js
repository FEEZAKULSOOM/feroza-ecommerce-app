import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? "FOUND" : "MISSING",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "FOUND" : "MISSING",
});

const uploadOnCloudinary = async (filePath) => {

    try {
        if (!filePath) {
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filePath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return uploadResult.secure_url;

    } catch (error) {

        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        console.log("Cloudinary upload error:", error);

        throw error;
    }
};

export default uploadOnCloudinary;