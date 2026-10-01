
import dotenv from "dotenv";
dotenv.config();
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["https://feroza-ecommerce-app-frontend.onrender.com",
    "http://localhost:5174"

  ], // Replace with your frontend URL
  credentials: true
}));


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use('/api/cart' , cartRoutes)
app.use ('/api/orders'  , orderRoutes)

app.get("/", (req, res) => {
  res.send("Feroza API is running...");
});


app.listen(PORT, () => {
    connectDB();
  console.log(`Feroza server running on port ${PORT}`);
});